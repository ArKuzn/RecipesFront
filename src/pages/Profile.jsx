import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import user from "../components/user"
import Total from "../components/Header"
import ProfileCard from "../components/profileCard"
import cookie from 'react-cookies'
import UpdateUserForm from '../components/update-user-form'
import { Button } from '@material-ui/core';
export default class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showProfile: false,
            profile: '',
            logout: false,
            token: true,
            update: false
            // setOpen: false
        }
    }
    componentDidMount() {
        let url;
        if (this.props.match.params.id) {
            url = new URL(`http://localhost:3000/api/users/${this.props.match.params.id}`)
        }
        else {
            if (!cookie.load('token')) {
                this.setState({ token: false });
            }
            let params = { token: cookie.load('token') }
            url = new URL('http://localhost:3000/api/users/profile')
            url.search = new URLSearchParams(params)
            this.setState({ logout: true, deleteAccount: true });
            debugger

        }
        fetch(url, { method: "GET" })
            .then(response => {
                debugger
                if (response.ok) {
                    return response.json();
                }

                throw new Error("Network response was not ok");
            })
            .then(json => {
                debugger
                this.setState({ showProfile: true, profile: json });
            })
            .catch(error => {
                console.log(error);
            });
    }
    showProfile = () => {
        debugger
        if (this.state.showProfile) {
            debugger
            if (!this.state.update) {
                return (<div><ProfileCard
                    {...this.state.profile}
                    logout={this.state.logout}
                    deleteAccount={this.state.deleteAccount}
                ></ProfileCard>
                </div>)
            }
            else {
                debugger
                return (
                    <UpdateUserForm {...this.state.profile} onClose={this.handleUpdateClose}></UpdateUserForm>
                )
            }
        }
    }
    Redirect = () => {
        if (!this.state.token) {
            return (
                <Redirect to={{
                    pathname: "/",
                    // state: { from: props.location }
                }} />
            )
        }
    }
    handleClick = () => {
        this.setState({ update: true })
    }
    handleUpdateClose = () => {

        this.setState({ update: false })
        let url;
        let params = { token: cookie.load('token') }
        url = new URL('http://localhost:3000/api/users/profile')
        url.search = new URLSearchParams(params)
        fetch(url, { method: "GET" })
            .then(response => {
                debugger
                if (response.ok) {
                    return response.json();
                }

                throw new Error("Network response was not ok");
            })
            .then(json => {
                debugger
                this.setState({ showProfile: true, profile: json });
            })
            .catch(error => {
                console.log(error);
            });
    }
    updateAvatar = (avatar) => {

        debugger
        let params = avatar[0];
        let formData = new FormData()
        formData.append('avatar', params);
        fetch(`http://localhost:3000/api/users/${this.state.profile.id}`, {
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
                if (json.avatarpath) {
                    let newprofile = { ...this.state.profile };
                    newprofile.avatar = json.avatarpath;
                    this.setState({ profile: newprofile });

                }

            })
            .catch(error => {
                console.log(error);
            });
    }
    ShowUpdateAvatar = () => {
        if (this.props.match.params.id) {
            return (<div></div>)
        }
        return (
            <div>
                <input
                    id="raised-button-file"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => this.updateAvatar(e.target.files)} />
                <label htmlFor="raised-button-file">
                    <Button variant="raised" component="span"  >
                        Upload New Avatar
            </Button>
                </label>
            </div>
        )
    }
    ShowUpdateUser = () => {
        if (this.props.match.params.id) {
            return (<div></div>)
        }
        else {
            if (!this.state.update) {
                return (<Button onClick={this.handleClick} color="primary">Update profile</Button>)
            }
        }
    }
    render() {
        var value;
        if (this.props.match.params.id) {
            value = this.props.match.params.id;
        }
        else {
            value = 'just your profile'
        }
        return (
            <div>
                <Total test={'hi, prop, its profile'} />
                {this.showProfile()}
                {this.ShowUpdateAvatar()}
                {this.ShowUpdateUser()}
                <h2>Profiledd</h2>
                {this.Redirect()}
            </div>
        )
    }
}