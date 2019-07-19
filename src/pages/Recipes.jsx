import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import cookie from 'react-cookies';
import Total from '../components/Header';
import Recipeitem from '../components/minirecipe';
import Filter from '../components/filter';
import { setUser } from '../store/user/actions';
import config from '../config';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: {},
      favorites: [],
    };
  }

  componentDidMount() {
    fetch(`${config.apiUrl}/recipes/filter`, { method: 'GET' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((json) => {
        this.setState({ recipes: json });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  showRecipes = () => {
    const token = cookie.load('token');
    let Recipes = [];
    for (let i = 0; i < this.state.recipes.length; i += 1) {
      let favorite = false;
      for (let recipeId in this.props.user.favorites) {
        if (this.state.recipes[i].id == this.props.user.favorites[recipeId]) {
          favorite = true;
        }
      }
      Recipes.push(
        <Recipeitem
          title={this.state.recipes[i].title}
          images={this.state.recipes[i].images}
          ingredients={this.state.recipes[i].ingredientsTable}
          steps={this.state.recipes[i].stepItem}
          id={this.state.recipes[i].id}
          author={this.state.recipes[i].author}
          duration={this.state.recipes[i].duration}
          difficult={this.state.recipes[i].difficult}
          favorite={favorite}
          token={token}
          {...this.props}
        />,
      );
    }
    return (
      <Box className="body__list" display="flex" flexDirection="column" justifyContent="space-around" flexWrap="wrap">
        <Filter onApplyFilter={this.handleFilter} />
        <Box className="body__list" display="flex" flexDirection="column" justifyContent="space-around">
          {Recipes}
        </Box>
      </Box>
    );
  }

  handleFilter = (recipes) => {
    this.setState({ recipes });
  }

  render() {
    return (
      <div className="body">
        <Total />
        <h2>Recipes</h2>
        {this.showRecipes()}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.userStore.user,
  };
};
const mapDispatchToProps = {
  setUser,
};
const enchancer = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default enchancer(Recipes);