import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Total from "../components/Header"
import Recipeitem from "../components/minirecipe"
import { fips } from 'crypto';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: {}
        }
    }
    componentDidMount() {
        fetch("http://localhost:3000/api/recipes/filter", { method: "GET" })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error("Network response was not ok");
            })
            .then(json => {
                this.setState({ recipes: json });
            })
            .catch(error => {
                console.log(error);
            });
    }
    showRecipes = () => {
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
    render() {
        return (
            <div>
                <Total />
                <h2>Home</h2>
                {this.showRecipes()}
            </div>
        )
    }
}