import React from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';

export default class DeleteRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Author: false,
    };
    this.token = true;
  }

  componentDidMount() {
    if (!cookie.load('token')) {
      this.setState({ Author: false });
      // this.setState({ redirect: true });
    } else {
      const params = { token: cookie.load('token') };
      const url = new URL('http://localhost:3000/api/users/profile');
      url.search = new URLSearchParams(params);
      fetch(url, { method: 'GET' })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }

          throw new Error("Network response was not ok");
        })
        .then((json) => {
          // this.setState({ userId: json.id });
          if (this.props.author == json.id) {
            this.setState({ Author: true });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  delete = () => {
    const url = new URL(`http://localhost:3000/api/recipes/${this.props.id}`);
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
    if (this.state.Author) {
      return <button type="button" onClick={this.delete}>Delete recipe</button>;
    }
    return null;
  };

  render() {
    return <div>{this.showButton()}</div>;
  }
}
// DeleteRecipe.state: {
//   Author: boolean;
// }
DeleteRecipe.propTypes = {
  author: PropTypes.number,
  onDeleted: PropTypes.func,
};
DeleteRecipe.defaultProps = {
  author: 0,
  onDeleted: null,
};
