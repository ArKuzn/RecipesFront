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

export default class LoginPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            wrongLogin: false,
            wrongPass: false,
            error: '',
            lyl: true
        }

    }
    Register = () => {
        this.setState({ wrongLogin: false, wrongPass: false, error: '' });
        this.setState({ open: false });
    }
    handleClickOpen = () => {
        this.setState({ wrongLogin: false, wrongPass: false, error: '' });
        this.setState({ open: true });
    }
    handleSubmit = (event) => {
        this.setState({ wrongLogin: false, wrongPass: false, error: '' });
        event.preventDefault();
        var formBody = [];
        formBody.push('login' + '=' + event.target.elements['login'].value)
        formBody.push('password' + '=' + event.target.elements['password'].value)
        formBody = formBody.join("&");
        console.log(JSON.stringify(formBody));
        fetch('http://localhost:3000/api/users/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        })
            .then(response => {

                if (response.status == 401) {
                    return response.json();
                }
                if (response.ok) {
                    return response.json();
                }

                throw new Error("Network response was not ok");
            })
            .then(json => {
                if (json.field == 'password') {
                    this.setState({ wrongPass: true, error: json.msg });

                }
                if (json.field == 'login') {
                    this.setState({ wrongLogin: true, error: json.msg });
                }
                if (json.token) {
                    cookie.save('token', json.token, { path: '/' })
                    this.setState({ open: false });
                    this.props.onClose(true);
                }

            })
            .catch(error => {
                console.log(error);
            });
    }
    handleClose = () => {
        this.props.onClose(true);
        this.setState({ open: false });
    }
    handleChange = () => {
        this.props.onRegister(true);
    }
    render() {
        const value = this.props.test;
        return (
            <div>
                <Dialog open={true} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <form class="Login__form" onSubmit={this.handleSubmit}>
                        <DialogTitle id="form-dialog-title">Login</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please enter your login and password
                </DialogContentText>
                            <TextField
                                error={this.state.wrongLogin}
                                autoFocus
                                margin="dense"
                                id="login"
                                label="Login"
                                type="text"
                                fullWidth
                            />
                            <TextField
                                error={this.state.wrongPass}
                                margin="dense"
                                id="password"
                                label="Password"
                                type="password"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <span class="error">{this.state.error}</span>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                </Button>
                            <Button onClick={this.handleChange} color="primary">
                                Register
                </Button>
                            <Button type="submit" color="primary">
                                Login
                </Button>

                        </DialogActions>
                    </form>
                </Dialog>

            </div>
        )
    }
}