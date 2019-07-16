import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class FavoriteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
    };
  }

  componentDidMount() {
    // debugger
    // alert(`yay`);
    this.setState({ favorite: this.props.favorite });
  }
  // static getDerivedStateFromProps(props, state) {
  //     debugger
  //     // state.setState({ favorite: props.favorite })
  // }

  componentDidUpdate(prevProps) {
    // debugger
    if (this.props.favorite != prevProps.favorite) {
      this.setState({ favorite: this.props.favorite, id: this.props.id })
    }
    // alert(`yay2`);
    // this.setState({ favorite: false })
  }

  ClickHandler = () => {
    let formBody = [];
    formBody.push('token = '.this.props.token);
    formBody = formBody.join('&');
    fetch(`http://localhost:3000/api/recipes/favorite/${this.props.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((json) => {
        if (!json.error) {
          this.setState({ favorite: (this.state.favorite) ? false : true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  favoriteButton = () => {
    const text = (this.state.favorite) ? 'remove from favorite' : 'add to favorite';
    if (this.props.token) {
      return (
        <div className="item__text-favorite">
          <p className="item__text-name-p">
            <button type="button" onClick={this.ClickHandler}>{text}</button>
          </p>
        </div>
      );
    }
    return null;
  }

  render() {
    // debugger
    return (
      <div>
        {this.favoriteButton()}
      </div>
    );
  }
}
FavoriteButton.propTypes = {
  token: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};
