import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import RegisterPopup from './register';
import LoginPopup from './login';

export default class ControllerLoginPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      register: false,
    };
  }

  handleClickOpen = () => {
    // this.state.setOpen(true);
    // this.setState({ setOpen: true });
    this.setState({ login: true });
  };

  handleClose = () => {
    this.props.onAuth();
    this.setState({ login: false, register: false });
  }

  handleChangetoRegister = () => {
    this.setState({ register: true, login: false });
  }

  handleChangetoLogin = () => {
    this.setState({ register: false, login: true });
  }

  controller = () => {
    if (this.state.login) {
      return (
        <LoginPopup onClose={this.handleClose} onRegister={this.handleChangetoRegister} />
      );
    }
    if (this.state.register) {
      return (
        <RegisterPopup onClose={this.handleClose} onLogin={this.handleChangetoLogin} />
      );
    }
    return null;
  }

  render() {
    // const [open, setOpen] = React.useState(false);
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Login/Register
        </Button>
        {this.controller()}

      </div>
    );
  }
}
ControllerLoginPopup.propTypes = {
  onAuth: PropTypes.func,
};
ControllerLoginPopup.defaultProps = {
  onAuth: null,
};
