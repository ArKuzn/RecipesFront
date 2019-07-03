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
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import clsx from 'clsx';

export default class UpdateUserForm extends Component {




    constructor(props) {
        super(props)
        this.state = {
            // setOpen: false
            pass: false,
            Auth: true,
            err_pass: false
        }
    }

    handleClickPasswordHide = () => {
        this.setState({ pass: (this.state.pass) ? false : true })
    }
    handleClose = () => {

        this.props.onClose(true);
        // alert('Closed');
    }
    handleSubmit = (event) => {
        event.preventDefault();
        debugger
        let params = { ...event.target };
        let formData = new FormData()
        for (var k in params) {
            if (event.target[k].id == "avatar") {
                formData.append(event.target[k].id, params[k]);
                continue
            }
            formData.append(event.target[k].id, params[k].value);

        }
        fetch(`http://localhost:3000/api/users/${this.props.id}`, {
            method: 'PUT',

            body: formData,

        })
            .then(response => {
                debugger
                if (response.ok) {
                    return response.json();
                }

                throw new Error("Network response was not ok");
            })
            .then(json => {
                debugger
                if (!json.err_field) {
                    this.props.onClose(true);
                }
                else {
                    for (let err_field of json.err_field) {
                        if (err_field == "password") {
                            this.setState({ err_pass: true });
                        }
                    }
                }

            })
            .catch(error => {
                console.log(error);
            });
    }
    changePassword = () => {
        if (!this.state.pass) {
            return (
                <div>
                    <Button onClick={this.handleClickPasswordHide} color="primary">
                        Change password
                </Button>
                </div>

            )
        } else {
            return (
                <div>

                    <TextField
                        error={this.state.err_pass}
                        margin="dense"
                        id="oldpassword"
                        label="Old password"
                        type="password"
                        variant="outlined"
                    />
                    <TextField
                        id="newpassword"
                        label="New password"
                        margin="normal"
                        variant="outlined"
                        type="password"
                    />
                    <TextField
                        id="renewpassword"
                        label="Repeat new password"
                        margin="normal"
                        variant="outlined"
                        type="password"

                    />
                    <Button onClick={this.handleClickPasswordHide} color="primary">
                        Hide change password
                </Button>



                </div>
            )
        }
    }
    render() {
        // const [open, setOpen] = React.useState(false);
        return (
            <form class="Update__form" onSubmit={this.handleSubmit}>
                <TextField
                    value={this.props.login}
                    margin="dense"
                    id="login"
                    label="Login"
                    type="text"
                    disabled
                />
                <TextField
                    defaultValue={this.props.name}
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"

                />
                <TextField
                    defaultValue={this.props.about}
                    rows="4"
                    id="about"
                    label="About"
                    margin="normal"
                    variant="outlined"
                    type="text"
                    multiline
                />
                {this.changePassword()}
                <Button onClick={this.handleClose} color="primary">
                    Close
                </Button>

                <Button type="submit" color="primary">
                    Update
                </Button>
            </form>
        )
    }
}