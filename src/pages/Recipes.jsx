import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Total from "../components/Header"
import Recipeitem from "../components/minirecipe"
import Recipe from "../components/recipe"
import Filter from "../components/filter"
import cookie from 'react-cookies'
export default class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: {},
            recipe: {},
            Auth: false,
            favorites: []
        }
    }
    componentDidMount() {
        if (cookie.load('token')) {
            this.setState({ Auth: true });
            let params = { token: cookie.load('token') }
            let url = new URL('http://localhost:3000/api/users/profile')
            url.search = new URLSearchParams(params)
            fetch(url, { method: "GET" })
                .then(response => {
                    debugger
                    if (response.ok) {
                        return response.json();
                    }

                    throw new Error("Network response was not ok");
                })
                .then(json => {
                    debugger
                    this.setState({ favorites: json.favorites });
                })
                .catch(error => {
                    console.log(error);
                });

        }



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
            fetch("http://localhost:3000/api/recipes/filter", { method: "GET" })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }

                    throw new Error("Network response was not ok");
                })
                .then(json => {
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
                    this.setState({ recipes: json });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    showRecipes = () => {
        let token = cookie.load('token');

        if (this.state.recipes[0]) {
            let Recipes = [];
            for (let i = 0; i < this.state.recipes.length; i++) {
                let favorite = false;
                for (let recipeId of this.state.favorites) {
                    debugger
                    if (this.state.recipes[i].id == recipeId) {
                        favorite = true;
                    }
                }

                Recipes.push(
                    <Recipeitem
                        title={this.state.recipes[i].title}
                        images={this.state.recipes[i].images}
                        ingredients={this.state.recipes[i].ingredients}
                        steps={this.state.recipes[i].steps}
                        id={this.state.recipes[i].id}
                        author={this.state.recipes[i].author}
                        duration={this.state.recipes[i].duration}
                        favorite={favorite}
                        token={token}
                    >
                    </Recipeitem>)
            }
            return (
                <div>
                    {Recipes}
                    <Filter onApplyFilter={this.handleFilter} ></Filter >
                </div>
            )
        }
        if (this.state.recipe.images) {
            let result;
            let favorite = false;
            for (let recipeid of this.state.favorites) {
                if (this.state.recipe.id == recipeid) {
                    favorite = true;
                    break
                }
            }
            debugger
            result = <Recipe
                title={this.state.recipe.title}
                images={this.state.recipe.images}
                ingredients={this.state.recipe.ingredients}
                steps={this.state.recipe.steps}
                id={this.state.recipe.id}
                author={this.state.recipe.author}
                duration={this.state.recipe.duration}
                token={token}
                favorite={favorite}
            ></Recipe>
            return result;
        }
    }
    handleFilter = (recipes) => {
        this.setState({ recipes: recipes });
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

                <h2>Recipes {value}</h2>
                {this.showRecipes()}

            </div>

        )
    }
}