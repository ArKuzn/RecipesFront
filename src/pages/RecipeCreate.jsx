import React from 'react';
import cookie from 'react-cookies';
import Total from '../components/Header';
import CreateRecipeForm from '../components/recipe-creator-form';
import config from '../config';

export default class RecipeCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPage: false,
      logout: false,
      token: true,
      update: false,
    };
  }

  Back = () => {
    return this.props.history.push('/');
  }

  showPage = () => {
    return (
      <div>
        <CreateRecipeForm onSubmit={this.handeSubmit} onBack={this.Back} />
      </div>
    );
  }

  handeSubmit = (event, files, stepsimages) => {
    event.preventDefault();
    let ingredients = [];
    let steps = [];
    for (let element in event.target.elements) {
      try {
        if (event.target.elements[element].id.split(" ")[0] == "ingredient") {
          ingredients.push(event.target.elements[element].value)
        }
        if (event.target.elements[element].id.split(" ")[0] == "step") {
          steps.push(event.target.elements[element].value)
        }
      } catch (error) {
        console.log(error);
      }
    }
    ingredients.length -= 1;
    steps.length -= 1;
    ingredients = ingredients.join('|');
    steps = steps.join('|');
    const params = {
      title: event.target.elements['title'].value,
      calories: event.target.elements['calories'].value,
      difficult: event.target.elements['difficult'].value,
      duration: event.target.elements['duration'].value,
      ingredients,
      steps,
      token: cookie.load('token'),
    };
    let formData = new FormData();
    for (let fileId in files) {
      formData.append("images", files[fileId]);
    }
    for (let fileId in stepsimages) {
      formData.append("stepsimages", stepsimages[fileId]);
    }
    formData.append('ingredients', ingredients);
    formData.append('title', event.target.elements['title'].value);
    formData.append('calories', event.target.elements['calories'].value);
    formData.append('difficult', event.target.elements['difficult'].value);
    formData.append('duration', event.target.elements['duration'].value);
    formData.append('steps', steps);
    formData.append('token', cookie.load('token'));
    fetch(`${config.apiUrl}/recipes`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((json) => {
        if (!json.err_field) {
          return this.props.history.push('/');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Total />
        <h2>Create Recipe</h2>
        {this.showPage()}
      </div>
    );
  }
}

// export default withRouter(RecipeCreate)
