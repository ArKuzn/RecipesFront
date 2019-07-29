import React from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import config from '../config';

export default class DeleteRecipe extends React.Component {

  delete = () => {
    const url = new URL(`${config.apiUrl}/recipes/${this.props.id}`);
    const params = { token: cookie.load('token') };
    url.search = new URLSearchParams(params);
    fetch(url, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((json) => {
        if (!json.error) {
          this.props.onDeleted(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  showButton = () => {
    if (this.props.active) {
      return <button type="button" onClick={this.delete}>Delete recipe</button>;
    }
    return null;
  };

  render() {
    return <div>{this.showButton()}</div>;
  }
}
DeleteRecipe.propTypes = {
  onDeleted: PropTypes.func,
  active: PropTypes.bool,
};
DeleteRecipe.defaultProps = {
  onDeleted: null,
  active: false,
};
