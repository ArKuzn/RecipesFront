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

export default class ProfileCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // setOpen: false
            Auth: true
        }

    }
    redirect = () => {

        if (!this.state.Auth) {
            return (<Redirect to={{
                pathname: "/",
                // state: { from: props.location }
            }} />)
        }
    }
    logout = () => {

        cookie.remove('token', { path: '/' })
        this.setState({ Auth: false });
    }
    logoutBtn = () => {
        if (this.props.logout) {
            return (<span class="logout" onClick={this.logout}>Logout</span>)
        }
    }
    delete = () => {
        debugger
        let url;
        let params = { token: cookie.load('token') }
        url = new URL(`http://localhost:3000/api/users/${this.props.id}`)
        url.search = new URLSearchParams(params)
        fetch(url, {
            method: "DELETE"
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
                if (!json.error) {
                    this.logout();
                }
            })
            .catch(error => {
                console.log(error);
            });

    }
    deleteAccountBtn = () => {
        if (this.props.deleteAccount) {
            return (<span class="delete" onClick={this.delete}>Delete Account</span>)
        }
    }
    render() {
        // const [open, setOpen] = React.useState(false);
        return (
            <div class="wrapper">
                <div class="user">
                    <div class="user__id">
                        <span class="user__id-span">User {this.props.id}</span>
                    </div>
                    <div class="user__avatar">
                        <img class="user__avatar-img" src={"http://localhost:3000/api/" + this.props.avatar}></img>
                    </div>
                    <div class="user__login">
                        <span class="user__login-span">Login: {this.props.login}</span>
                    </div>
                    <div class="user__name">
                        <span class="user__name-span">Name: {this.props.name}</span>
                    </div>
                    <div class="user__about">
                        <span class="user__about-span">About: {this.props.about}</span>
                    </div>
                    <div class="user__favorites">
                        <span class="user__favorites-span">
                            Favorites: {this.props.favorites}
                        </span>
                    </div>
                    <div class="user__logoutbtn">
                        {this.logoutBtn()}
                    </div>
                    <div class="user__deleteAccountBtn">
                        {this.deleteAccountBtn()}
                    </div>
                </div>
                <div class="redirect">
                    {this.redirect()}
                </div>

            </div >
        )
    }
}