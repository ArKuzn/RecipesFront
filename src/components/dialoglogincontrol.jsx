import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import cookie from 'react-cookies';
import RegisterPopup from "../components/register"
import LoginPopup from "../components/login"
export default class ControllerLoginPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: false,
            register: false,
            open: false
            // setOpen: false
        }

    }
    handleClickOpen = () => {
        // this.state.setOpen(true);
        // this.setState({ setOpen: true });
        this.setState({ open: true, login: true });

    }
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
            return (<LoginPopup onClose={this.handleClose} onRegister={this.handleChangetoRegister}></LoginPopup>)
        }
        if (this.state.register) {
            return (<RegisterPopup onClose={this.handleClose} onLogin={this.handleChangetoLogin}></RegisterPopup>)
        }
    }
    render() {
        const value = this.props.test;
        // const [open, setOpen] = React.useState(false);
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Login/Register
            </Button>
                {this.controller()}

            </div>
        )
    }
}