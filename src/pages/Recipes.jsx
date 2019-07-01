import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Total from "../components/Header"
import Recipeitem from "../components/minirecipe"
import Recipe from "../components/recipe"
import Filter from "../components/filter"
export default class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: {},
            recipe: {}
        }
    }
    componentDidMount() {
        if (this.props.match.params.id) {
            fetch(`http://localhost:3000/api/recipes/${this.props.match.params.id}`, { method: "GET" })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }

                    throw new Error("Network response was not ok");
                })
                .then(json => {
                    this.setState({ recipe: json });
                })
                .catch(error => {
                    console.log(error);
                });
        }
        else {
            fetch("http://localhost:3000/api/recipes/filter/ad", { method: "GET" })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }

                    throw new Error("Network response was not ok");
                })
                .then(json => {
                    console.log('response is ' + JSON.stringify(json));
                    console.log('recipes is' + this.recipes);
                    //   for(let i = 0;i<json.length;i++){
                    //   this.recipes.push({
                    //     title: json[i].title,
                    //     image: json[i].images,
                    //     difficult: json[i].difficult,
                    //     calories: json[i].calories,
                    //     time: json[i].time,
                    //     id:json[i]._id
                    //   });
                    //   }
                    //   this.recipes.length=8;
                    console.log('recipes is' + JSON.stringify(this.recipes));
                    this.setState({ recipes: json });
                    console.log('recipes state is' + JSON.stringify(this.state.recipes));
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    showRecipes = () => {
        if (this.state.recipes[0]) {
            let Recipes = [];
            for (let i = 0; i < this.state.recipes.length; i++) {
                Recipes.push(
                    <Recipeitem
                        title={this.state.recipes[i].title}
                        images={this.state.recipes[i].images}
                        ingredients={this.state.recipes[i].ingredients}
                        steps={this.state.recipes[i].steps}
                        id={this.state.recipes[i].id}
                        author={this.state.recipes[i].author}
                        duration={this.state.recipes[i].author}
                    >
                    </Recipeitem>)
            }
            return Recipes;
        }
        if (this.state.recipe.images) {
            let result;
            result = <Recipe
                title={this.state.recipe.title}
                images={this.state.recipe.images}
                ingredients={this.state.recipe.ingredients}
                steps={this.state.recipe.steps}
                id={this.state.recipe.id}
                author={this.state.recipe.author}
                duration={this.state.recipe.duration}
            ></Recipe>
            return result;
        }
    }

    render() {
        var value;
        if (this.props.match.params.id) {
            value = this.props.match.params.id;
        }
        else {
            value = ''
        }
        return (
            <div>
                <Total />

                <h2>Recipe {value}</h2>
                {this.showRecipes()}
                <Filter />
            </div>

        )
    }
}