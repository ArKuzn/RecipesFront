import React, { Component } from 'react';
import Total from '../components/Header';
import Recipeitem from '../components/minirecipe';
import config from '../config';
// import config from "../config";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
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
    const Recipes = [];
    for (let i = 0; i < this.state.recipes.length; i += 1) {
      Recipes.push(
        <Recipeitem
          title={this.state.recipes[i].title}
          images={this.state.recipes[i].images}
          ingredients={this.state.recipes[i].ingredients}
          steps={this.state.recipes[i].steps}
          id={this.state.recipes[i].id}
          author={this.state.recipes[i].author}
          duration={this.state.recipes[i].author}
        />,
      );
    }
    return Recipes;
  };

  render() {
    return (
      <div>
        <Total />
        <h2>Home</h2>
        {this.showRecipes()}
      </div>
    );
  }
}
