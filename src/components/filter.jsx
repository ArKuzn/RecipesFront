import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.state = {
      ingredients: {},
    };
    this.form = React.createRef();
  }

  componentDidMount() {
    const url = new URL('http://localhost:3000/api/recipes/ingredients')
    fetch(url, { method: 'GET' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((json) => {
        this.setState({ ingredients: json.recipes });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  showImages = () => {
    const images = [];
    for (let i = 0; i < this.props.images.length; i += 1) {
      images.push(
        <div className="item__image">
          <img className="item__image-img" src={`http://localhost:3000/${this.props.images[i]}`} alt="index recipe" />
        </div>,
      );
    }
    return images;
  }

  ingredientsInput = () => {
    const ingredientCheckboxs = [];
    for (let ingredient in this.state.ingredients) {
      ingredientCheckboxs.push(
        <label key={ingredient} class="ingredient1">
          <input type="checkbox" name="ingredients" value={this.state.ingredients[ingredient].title} onChange={this.handleInput} />
          {this.state.ingredients[ingredient].title}
        </label>,
      );
    }
    return ingredientCheckboxs;
  }

  handleInput = (event) => {
    const form = {};
    form.target = event.target.form;
    this.handleSubmit(form);
    console.log(this.form.current);
  };

  handleSubmit(event) {
    let ingredients = '';
    for (let i = 3; i < event.target.length; i += 1) {
      if (event.target[i].checked) {
        ingredients += `${event.target[i].value}-`;
      }
    }
    ingredients = ingredients.substr(0, ingredients.length - 1);
    const orderField = event.target.elements['rank'].value.split('-')[0];
    const direction = event.target.elements['rank'].value.split('-')[1];
    let duration = '';
    if (event.target.elements['durationFrom'].value || event.target.elements['durationTo'].value) {
      duration = `${event.target.elements['durationFrom'].value || '1'}-${event.target.elements['durationTo'].value || '99'}`;
    }

    const params = { ingredients, order_field: orderField, direction, duration };

    const url = new URL('http://localhost:3000/api/recipes/filter')
    url.search = new URLSearchParams(params)
    fetch(url, { method: 'GET' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error("Network response was not ok");
      })
      .then((json) => {
        this.props.onApplyFilter(json);
      })
      .catch((error) => {
        console.log(error);
      });

    // event.preventDefault();
    // this.form.current.preventDefault();
    try {
      event.preventDefault();
    } catch (err) {
      console.log(err);
    }
  }


  render() {
    return (
      <div className="filter">
        <form className="filter__form" onSubmit={this.handleSubmit} ref={this.form}>
          <label className="duration">
            Duration from
            &nbsp;
            <input className="duration__input" placeholder="0" name="durationFrom" type="text" id="duration__from" onChange={this.handleInput} />
            &nbsp;to&nbsp;
            <input className="duration__input" placeholder="999" name="durationTo" type="text" id="duration__to" onChange={this.handleInput} />
            &nbsp;
          </label>
          <label class="rank">
            Rank&nbsp;
            <select name="rank" onChange={this.handleInput}>
              <option value="title-DESC">name down</option>
              <option value="title-ASC">name up</option>
              <option value="difficult-ASC">difficult up</option>
              <option value="difficult-DESC">difficult down</option>
            </select>
          </label>
          <input className="filter__submit" type="submit" />
          <div className="ingredients">
            <span className="ingredients-span"> Choose ingredients: </span>
            <div className="ingredients-checkboxs">{this.ingredientsInput()}</div>
          </div>

        </form>
      </div>
    );
  }
}
Filter.propTypes = {
  images: PropTypes.array,
  favorite: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  onApplyFilter: PropTypes.func.isRequired,
};
Filter.defaultProps = {
  images: [],
};
