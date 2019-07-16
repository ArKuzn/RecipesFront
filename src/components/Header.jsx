import React, { Component } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Box } from '@material-ui/core';
import ControllerLoginPopup from './dialoglogincontrol';

export default class Total extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Auth: false,
    };
  }

  componentDidMount() {
    if (cookie.load('token')) {
      this.setState({ Auth: true });
    }
  }

  CheckAuth = () => {
    if (cookie.load('token')) {
      this.setState({ Auth: true });
    }
  }

  ProfileController = () => {
    if (this.state.Auth) {
      return (
        <Link activeClassName="active" className="header__item-a" to="/profile">Profile</Link>
      );
    }
    return (<ControllerLoginPopup onAuth={this.CheckAuth} />);
  }

  CreateController = () => {
    if (this.state.Auth) {
      return (
        <Link activeClassName="active" className="header__item-a" to="/create">Create recipe</Link>
      );
    }
    return null;
  }

  render() {
    return (
      <Box display="flex" flexDirection="row" className="header">
        <Link activeClassName="active" className="header__item-a" to="/">Home</Link>
        {this.ProfileController()}
        {this.CreateController()}
        <Link activeClassName="active" className="header__item-a" to="/recipes">Recipes</Link>
      </Box>
    );
  }
}
