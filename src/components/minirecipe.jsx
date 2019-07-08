import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import FavoriteButton from "../components/favorite-button"

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
            <div class="item__text-favorite">
                <p class="item__text-name-p">
                    <button onClick={this.ClickHandler}>{text}</button>


                </p>
            </div>
        )
    }

    render() {
        // debugger
        const value = this.props.test;
        return (
            <div class="list__item">
                <div class="item__image">
                    <img class="item__image-img" src={'http://localhost:3000/api/' + this.props.images[0]} />
                </div>
                <div class="item__text">
                    <div class="item__text-recipeId">
                        <p class="item__text-name-p">

                            Recipe {this.props.id}

                        </p>
                    </div>
                    <div class="item__text-name">
                        <p class="item__text-name-p">
                            <Link class="item__text-name-p-a" to={"recipes/" + this.props.id}>
                                {this.props.title}
                            </Link>
                        </p>
                    </div>
                    <FavoriteButton token={this.props.token} favorite={this.props.favorite} id={this.props.id}></FavoriteButton>
                    <div class="item__text-ingredients">
                        <span class="item__text-ingredients-span">
                            Ингредиенты: {this.props.ingredients}
                        </span>
                    </div>
                    <div class="item__text-difficulty">
                        <span class="item__text-difficulty-span">Сложность:</span>
                        <div class="aside__rating" class="'rait_'+difficult"></div>
                    </div>
                    <div class="item__text-duration">
                        <span class="item__text-duration-span">Длительность готовки: {this.props.duration}ч.</span>
                    </div>

                    <div class="item__text-description">
                        <span class="item__text-description-span">Описание: {this.props.steps}</span>
                    </div>
                    <div class="item__text-author">
                        <span class="item__text-author-link">Автор:<Link class="item__text-name-p-a" to={"profile/" + this.props.author}>
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
            </div>
        )
    }
}