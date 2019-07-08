import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import FavoriteButton from "../components/favorite-button"
import StepsShow from "../components/stepsShow"
import RecipeEdit from "../components/recipe-edit"
import EditButton from './edit-button';
import DeleteRecipe from './delete-recipe';

export default class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steps: '',
            edit: false,
            redirect: false
        }
    }
    componentDidMount() {
        debugger
        fetch(`http://localhost:3000/api/recipes/steps/${this.props.id}`, { method: "GET" })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error("Network response was not ok");
            })
            .then(json => {
                this.setState({ steps: json.steps });
                // debugger
            })
            .catch(error => {
                console.log(error);
            });
    }
    showImages = () => {
        // let test = JSON.parse(this.props.images);

        console.log('images is ' + this.props.images)
        let images = [];
        for (let i = 0; i < this.props.images.length; i++) {
            images.push(
                <div class="item__image">
                    <img class="item__image-img" src={'http://localhost:3000/api/' + this.props.images[i]} />
                </div>
            )
        }
        return images;
    }
    Redirect = () => {
        if (this.state.redirect) {
            return (
                <Redirect to={{
                    pathname: "/",
                    // state: { from: props.location }
                }} />
            )
        }
    }
    showPage = () => {
        if (this.state.edit == true) {
            // debugger
            return (
                <RecipeEdit
                    id={this.props.id}
                    author={this.props.author}
                    title={this.props.title}
                    images={this.props.images}
                    ingredients={this.props.ingredients}
                    steps={this.props.steps}
                    duration={this.props.duration}
                    difficult={this.props.difficult}
                    calories={this.props.calories}
                >
                </RecipeEdit>
            )
        }
        else {
            return (
                <div class="list__item">
                    {this.showImages()}
                    <div class="item__text">
                        <div class="item__text-name">
                            <p class="item__text-name-p">
                                {this.props.title}
                            </p>
                        </div>
                        <DeleteRecipe id={this.props.id} author={this.props.author} onDeleted={() => { this.setState({ redirect: true }) }}></DeleteRecipe>
                        <EditButton id={this.props.id} author={this.props.author} onEdit={() => { this.setState({ edit: true }) }}></EditButton>
                        <FavoriteButton token={this.props.token} favorite={this.props.favorite} id={this.props.id}></FavoriteButton>
                        <div class="item__text-ingredients">
                            <span class="item__text-ingredients-span">
                                Ингредиенты: {this.props.ingredients}
                            </span>
                        </div>
                        <div class="item__text-difficulty">
                            <span class="item__text-difficulty-span">Сложность: {this.props.difficult}</span>
                            <div class="aside__rating" class="'rait_'+difficult"></div>
                        </div>
                        <div class="item__text-duration">
                            <span class="item__text-duration-span">Длительность готовки: {this.props.duration}ч.</span>
                        </div>

                        <div class="item__text-calories">
                            <span class="item__text-description-span">Калории: {this.props.calories}</span>
                        </div>
                        <div class="item__text-description">
                            <span class="item__text-description-span">Описание: {this.props.steps}</span>
                        </div>
                        <div class="item__text-author">
                            <span class="item__text-author-link">Автор:<Link class="item__text-name-p-a" to={"profile/" + this.props.author}>
                                {this.props.author}
                            </Link></span>
                        </div>
                        <StepsShow steps={this.state.steps}></StepsShow>
                    </div>
                    <div class="item__buttons">
                        <div class="item__buttons-button">
                            <a href>
                                <div class="item__buttons-button-img disactive"></div>
                            </a>
                        </div>
                    </div>
                </div>
            )
        }
    }
    render() {
        const value = this.props.test;
        return (
            <div>
                {this.showPage()}
                {this.Redirect()}
            </div>
        )
    }
}