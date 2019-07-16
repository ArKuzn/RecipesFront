import React from 'react';
import cookie from 'react-cookies';
import PropTypes from 'prop-types';

export default class EditButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Author: false,
    };
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

  showPage = () => {
    if (this.state.Author) {
      return (
        <button type="button" onClick={() => { this.props.onEdit(true); }}>Edit</button>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        {this.showPage()}
      </div>
    );
  }
}
EditButton.propTypes = {
  onEdit: PropTypes.func.isRequired,
  author: PropTypes.number.isRequired,
};
