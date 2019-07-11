import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import FavoriteButton from "../components/favorite-button"
import StepsShow from "../components/stepsShow"
import RecipeEdit from "../components/recipe-edit"
import EditButton from './edit-button';
import DeleteRecipe from './delete-recipe';
import IngredientsShow from './show-ingredients';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
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

    }
    showImages = () => {
        // let test = JSON.parse(this.props.images);

        console.log('images is ' + this.props.images)
        let images = [];
        for (let i = 0; i < this.props.images.length; i++) {
            images.push(
                // <AutoRotatingCarousel>
                <div class="item__image">
                    <img class="item__image-img" src={'http://localhost:3000/api/' + this.props.images[i]} />
                </div>
                /* </AutoRotatingCarousel> */
            )
        }
        return images;
    }
    Redirect = () => {
        if (this.state.redirect) {
            return (
                <Redirect to={{
                    pathname: "/recipes",
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
                <div class="recipe__items">
                    <div class="recipe__content">

                        <Carousel width="550px">
                            {this.showImages()}
                        </Carousel>
                        <div class="item__text">
                            <div class="item__text-name">
                                <p class="recipe__item item__text-name-p">
                                    {this.props.title}
                                </p>
                            </div>
                            <DeleteRecipe id={this.props.id} author={this.props.author} onDeleted={() => { this.setState({ redirect: true }) }}></DeleteRecipe>
                            <EditButton id={this.props.id} author={this.props.author} onEdit={() => { this.setState({ edit: true }) }}></EditButton>
                            <FavoriteButton token={this.props.token} favorite={this.props.favorite} id={this.props.id}></FavoriteButton>
                            <div class="recipe__item item__text-ingredients">
                                <span class="item__text-ingredients-label">Ingredients:&nbsp;</span> <IngredientsShow ingredients={this.props.ingredients}></IngredientsShow>
                            </div>
                            <div class="recipe__item item__text-difficulty">
                                <span class="item__text-difficulty-span">Сложность: {this.props.difficult}</span>
                                <div class="aside__rating" class="'rait_'+difficult"></div>
                            </div>
                            <div class="recipe__item item__text-duration">
                                <span class="item__text-duration-span">Длительность готовки: {this.props.duration}ч.</span>
                            </div>

                            <div class="recipe__item item__text-calories">
                                <span class="item__text-description-span">Калории: {this.props.calories}</span>
                            </div>
                            <div class="recipe__item item__text-author">
                                <span class="item__text-author-link">Автор: <Link class="item__text-name-p-a" to={"/profile/" + this.props.author}>
                                    {this.props.author}
                                </Link></span>
                            </div>
                        </div>
                    </div>
                    <div class="recipe__steps">
                        <StepsShow steps={this.props.steps}></StepsShow>
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
            <div class="body__recipe">
                {this.showPage()}
                {this.Redirect()}
            </div>
        )
    }
}