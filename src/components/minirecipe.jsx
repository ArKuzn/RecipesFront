import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import FavoriteButton from "../components/favorite-button"
import IngredientsShow from './show-ingredients';
import { Box, Zoom, Slide } from '@material-ui/core';
export default class Recipeitem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorite: false
        }
    }
    componentDidMount() {
        this.setState({ favorite: this.props.favorite })
    }
    ClickHandler = () => {
        //    localhost:3000/api/recipes/favorite/4


        var formBody = [];
        formBody.push('token' + '=' + this.props.token)
        formBody = formBody.join("&");
        console.log(JSON.stringify(formBody));

        fetch(`http://localhost:3000/api/recipes/favorite/${this.props.id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        })
            .then(response => {

                if (response.ok) {
                    return response.json();
                }

                throw new Error("Network response was not ok");
            })
            .then(json => {

                if (!json.error) {
                    this.setState({ favorite: (this.state.favorite) ? false : true })
                }


            })
            .catch(error => {
                console.log(error);
            });

    }
    favoriteButton = () => {
        // debugger
        let text = (this.state.favorite) ? 'remove from favorite' : 'add to favorite'
        return (
            <div class="item__content-favorite">
                <p class="item__content-name-p">
                    <button onClick={this.ClickHandler}>{text}</button>


                </p>
            </div>
        )
    }

    render() {
        // debugger
        debugger
        return (
            <Slide in="true" direction="up" mountOnEnter unmountOnExit>
                <Box display="flex" flexDirection="row" className="list__name" >
                    <div class="item__image">
                        <img class="item__image-img" src={'http://localhost:3000/api/' + this.props.images[0]} />
                    </div>
                    <div class="item__content">
                        <div class="item__content-recipeId">
                            <p class="item__content-name-p">

                                Recipe {this.props.id}

                            </p>
                        </div>
                        <div class="item__content-name">
                            <p class="item__content-name-p">
                                <Link class="item__content-name-p-a" to={"recipes/" + this.props.id}>
                                    {this.props.title}
                                </Link>
                            </p>
                        </div>
                        <FavoriteButton token={this.props.token} favorite={this.props.favorite} id={this.props.id}></FavoriteButton>
                        <Box display="flex" flexDirection="row" className="item__content-ingredients">
                            <span class="item__content-ingredients-span">
                                Ингредиенты: &nbsp;
                        </span>
                            <IngredientsShow ingredients={this.props.ingredients}></IngredientsShow>
                        </Box>
                        <div class="item__content-difficulty">
                            <span class="item__content-difficulty-span">Сложность:&nbsp;{this.props.difficult}</span>
                            <div class="aside__rating" class="'rait_'+difficult"></div>
                        </div>
                        <div class="item__content-duration">
                            <span class="item__content-duration-span">Длительность готовки:&nbsp;{this.props.duration}ч.</span>
                        </div>

                        <div class="item__content-description">
                            <span class="item__content-description-span">Описание:&nbsp;{this.props.steps[0].text}</span>
                        </div>
                        <div class="item__content-author">
                            <span class="item__content-author-link">Автор:&nbsp;<Link class="item__content-name-p-a" to={"profile/" + this.props.author}>
                                {this.props.author}
                            </Link></span>
                        </div>
                    </div>
                    <div class="item__buttons">
                        <div class="item__buttons-button">
                            <a href>
                                <div class="item__buttons-button-img disactive"></div>
                            </a>
                        </div>
                    </div>
                </Box>
            </Slide>
        )
    }
}