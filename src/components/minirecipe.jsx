import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Recipeitem extends Component {
    render() {
        const value = this.props.test;
        return (
            <div class="list__item">
                <div class="item__image">
                    <img class="item__image-img" src={'http://localhost:3000/api/' + this.props.images[0]} />
                </div>
                <div class="item__text">
                    <div class="item__text-name">
                        <p class="item__text-name-p">
                            <Link class="item__text-name-p-a" to={"recipes/" + this.props.id}>
                                {this.props.title}
                            </Link>
                        </p>
                    </div>
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
                        <span class="item__text-author-link">Автор:<Link class="item__text-name-p-a" to={"users/" + this.props.author}>
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