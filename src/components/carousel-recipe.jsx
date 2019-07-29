import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Slide } from '@material-ui/core';
import PropTypes from 'prop-types';
import IngredientsShow from './show-ingredients';
import config from '../config';

export default class CarouselRecipe extends Component {
  componentDidMount() {
    this.setState({ favorite: this.props.favorite });
  }

  render() {
    // debugger
    return (
      <Slide in="true" direction="left" mountOnEnter unmountOnExit>
        <Box display="flex" flexDirection="row" className="list__name">
          <div className="carousel__image">
            <img className="carousel__image-img" src={`${config.apiUrl}/${this.props.images[0]}`} alt="index img" />
          </div>
          <div className="carousel__content">
            <div className="carousel__content-recipeId">
              <p className="carousel__content-name-p">
                Recipe
                {this.props.id}
              </p>
            </div>
            <div className="carousel__content-name">
              <p className="carousel__content-name-p">
                <Link class="carousel__content-name-p-a" to={`recipes/${this.props.id}`}>
                  {this.props.title}
                </Link>
              </p>
            </div>
            <Box display="flex" flexDirection="row" className="carousel__content-ingredients">
              <span className="carousel__content-ingredients-span">
                Ingredients: &nbsp;
              </span>
              <IngredientsShow ingredients={this.props.ingredients} />
            </Box>
            <div className="carousel__content-difficulty">
              <span className="carousel__content-difficulty-span">
                Difficult:&nbsp;
                {this.props.difficult}
              </span>
              <div className="'rait_'+difficult aside__rating aside__rating" />
            </div>
            <div className="carousel__content-duration">
              <span className="carousel__content-duration-span">
                Duration:&nbsp;
                {this.props.duration}
                h.
              </span>
            </div>

            <div className="carousel__content-description">
              <span className="carousel__content-description-span">
                Steps:&nbsp;
                {this.props.steps[0]
                  ? this.props.steps[0].text
                  : 'None'}
              </span>
            </div>
            <div className="carousel__content-author">
              <span className="carousel__content-author-link">
                Author:&nbsp;
                <Link class="carousel__content-name-p-a" to={`profile/${this.props.authorId}`}>
                  {this.props.author}
                </Link>
              </span>
            </div>
            <div className="carousel__content">
              <span className="carousel__content">
                Favorites count:&nbsp;{+this.props.favoriteCount}
              </span>
            </div>
          </div>
          <div className="carousel__buttons">
            <div className="carousel__buttons-button">
              <a href>
                <div className="carousel__buttons-button-img disactive" />
              </a>
            </div>
          </div>
        </Box>
      </Slide>
    );
  }
}
CarouselRecipe.propTypes = {
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
