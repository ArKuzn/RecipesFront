import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import cookie from 'react-cookies'

export default class RegisterPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            wrongLogin: false,
            wrongPass: false,
            error: '',
            Redirect: false
            // setOpen: false
        }


    }
    handleClickOpen = () => {
        // this.state.setOpen(true);
        // this.setState({ setOpen: true });
        this.setState({ wrongLogin: false, wrongPass: false, error: '' });
        this.setState({ open: true });
    }
    handleSubmit = (event) => {
        // this.state.setOpen(true);
        // event.target.elements['name'].value
        event.preventDefault();
        this.setState({ wrongLogin: false, wrongPass: false, error: '' });
        debugger
        let params = { ...event.target };
        let formData = new FormData()
        for (var k in params) {
            formData.append(event.target[k].id, params[k].value);

        }

        fetch('http://localhost:3000/api/users/registration', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                debugger
                if (response.status == 401) {
                    return response.json();
                }
                if (response.ok) {
                    return response.json();
                }

                throw new Error("Network response was not ok");
            })
            .then(json => {
                debugger
                if (json.error == true) {
                    this.setState({ wrongLogin: true, error: json.msg });

                }
                if (json.token) {
                    cookie.save('token', json.token, { path: '/' })
                    // alert(cookie.load('token'));
                    // this.props.onAuth();
                    this.setState({ Redirect: true });
                    this.setState({ open: false });
                    debugger
                }

            })
            .catch(error => {
                console.log(error);
            });




        // alert(event.target.elements['name'].value);
    }
    handleClose = () => {
        // this.state.setOpen(false);
        // this.setState({ setOpen: false });
        this.setState({ open: false });
    }
    Redirect = () => {
        if (this.state.Redirect) {
            this.props.onRedirect();
            this.setState({ Redirect: false });
        }
    }
    render() {
        const value = this.props.test;
        // const [open, setOpen] = React.useState(false);
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Registration
            </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <form class="Register__form" onSubmit={this.handleSubmit} id="registrationForm">
                        <DialogTitle id="form-dialog-title">Registration</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Be sure to fill in the fields with a star
                </DialogContentText>
                            <span class="Register__form-avatar-span">avatar: </span> <input type="file" id="avatar" />
                            <TextField
                                required
                                error={this.state.wrongLogin}
                                autoFocus
                                margin="dense"
                                id="login"
                                label="Login"
                                type="text"
                                fullWidth
                            />
                            <TextField
                                required
                                error={this.state.wrongPass}
                                margin="dense"
                                id="password"
                                label="Password"
                                type="password"
                                fullWidth
                            />
                            {/* <TextField
                                margin="dense"
                                id="name"
                                label="Name"
                                type="text"
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                id="about"
                                label="About"
                                multiline
                                fullWidth
                            /> */}
                        </DialogContent>
                        <DialogActions>
                            <span class="error">{this.state.error}</span>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                </Button>
                            <Button type="submit" color="primary">
                                Register
                </Button>

                        </DialogActions>
                    </form>
                </Dialog>
                {this.Redirect()}
            </div>
        )
    }
}