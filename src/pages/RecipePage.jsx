import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Total from "../components/Header"
import Recipeitem from "../components/minirecipe"
import Recipe from "../components/recipe"
import Filter from "../components/filter"
import cookie from 'react-cookies'
import { Box } from '@material-ui/core';
export default class RecipePage extends Component {
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
                    // debugger
                    if (response.ok) {
                        return response.json();
                    }

                    throw new Error("Network response was not ok");
                })
                .then(json => {
                    // debugger
                    this.setState({ favorites: json.favorites });
                })
                .catch(error => {
                    console.log(error);
                });

        }

        fetch(`http://localhost:3000/api/recipes/${this.props.match.params.id}`, { method: "GET" })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error("Network response was not ok");
            })
            .then(json => {
                debugger
                // json.stepItem
                json.stepItem.sort(function (a, b) {
                    if (a.index > b.index) {
                        return 1;
                    }
                    if (a.index < b.index) {
                        return -1;
                    }
                    // a должно быть равным b
                    return 0;
                });
                this.setState({ recipe: json });
            })
            .catch(error => {
                console.log(error);
            });

    }
    showRecipes = () => {
        let token = cookie.load('token');
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
                ingredients={this.state.recipe.ingredientsTable}
                steps={this.state.recipe.stepItem}
                id={this.state.recipe.id}
                author={this.state.recipe.author}
                duration={this.state.recipe.duration}
                token={token}
                favorite={favorite}
                difficult={this.state.recipe.difficult}
                calories={this.state.recipe.calories}
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
            <div class="body">
                <Total />

                <h2>Recipes {value}</h2>

                {this.showRecipes()}


            </div>

        )
    }
}