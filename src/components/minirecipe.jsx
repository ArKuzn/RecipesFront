import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Slide } from '@material-ui/core';
import PropTypes from 'prop-types';
import FavoriteButton from './favorite-button';
import IngredientsShow from './show-ingredients';
import PrivatComponent from './privat-component';
import config from '../config';

export default class Recipeitem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
    };
  }

  componentDidMount() {
    this.setState({ favorite: this.props.favorite });
  }

  render() {
    return (
      <Slide in="true" direction="up" mountOnEnter unmountOnExit>
        <Box display="flex" flexDirection="row" className="list__name">
          <div className="item__image">
            <img className="item__image-img" src={`${config.apiUrl}/${this.props.images[0]}`} alt="index img" />
          </div>
          <div className="item__content">
            <div className="item__content-recipeId">
              <p className="item__content-name-p">
                Recipe
                {this.props.id}
              </p>
            </div>
            <div className="item__content-name">
              <p className="item__content-name-p">
                <Link class="item__content-name-p-a" to={`recipes/${this.props.id}`}>
                  {this.props.title}
                </Link>
              </p>
            </div>
            {/* <FavoriteButton {...this.props} /> */}
            <PrivatComponent component={FavoriteButton} {...this.props} />
            <Box display="flex" flexDirection="row" className="item__content-ingredients">
              <span className="item__content-ingredients-span">
                Ингредиенты: &nbsp;
              </span>
              <IngredientsShow ingredients={this.props.ingredients} />
            </Box>
            <div className="item__content-difficulty">
              <span className="item__content-difficulty-span">
                Сложность:&nbsp;
                {this.props.difficult}
              </span>
              <div className="'rait_'+difficult aside__rating aside__rating" />
            </div>
            <div className="item__content-duration">
              <span className="item__content-duration-span">
                Длительность готовки:&nbsp;
                {this.props.duration}
                ч.
              </span>
            </div>

            <div className="item__content-description">
              <span className="item__content-description-span">
                Описание:&nbsp;
                {this.props.steps[0]
                  ? this.props.steps[0].text
                  : 'None'}
              </span>
            </div>
            <div className="item__content-author">
              <span className="item__content-author-link">
                Автор:&nbsp;
                <Link class="item__content-name-p-a" to={`profile/${this.props.author}`}>
                  {this.props.author}
                </Link>
              </span>
            </div>
          </div>
          <div className="item__buttons">
            <div className="item__buttons-button">
              <a href>
                <div className="item__buttons-button-img disactive" />
              </a>
            </div>
          </div>
        </Box>
      </Slide>
    );
  }
}
Recipeitem.propTypes = {
  token: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  difficult: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
