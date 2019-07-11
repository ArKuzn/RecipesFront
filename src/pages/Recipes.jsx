import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Total from "../components/Header"
import Recipeitem from "../components/minirecipe"
import Recipe from "../components/recipe"
import Filter from "../components/filter"
import cookie from 'react-cookies'
import { Box } from '@material-ui/core';
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

        fetch("http://localhost:3000/api/recipes/filter", { method: "GET" })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error("Network response was not ok");
            })
            .then(json => {
                debugger
                this.setState({ recipes: json });
            })
            .catch(error => {
                console.log(error);
            });
    }
    showRecipes = () => {
        let token = cookie.load('token');
        debugger
        let Recipes = [];
        for (let i = 0; i < this.state.recipes.length; i++) {
            let favorite = false;
            for (let recipeId of this.state.favorites) {
                // debugger
                if (this.state.recipes[i].id == recipeId) {
                    favorite = true;
                }
            }
            debugger
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
                >
                </Recipeitem>)
        }
        return (
            <Box className="body__list" display="flex" flexDirection="column" justifyContent="space-around" flexWrap="wrap">
                <Filter onApplyFilter={this.handleFilter} ></Filter >
                <Box className="body__list" display="flex" flexDirection="column" justifyContent="space-around">
                    {Recipes}

                </Box>

            </Box >
        )

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