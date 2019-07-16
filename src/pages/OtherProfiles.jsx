import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import user from "../components/user"
import Total from "../components/Header"
import ProfileCard from "../components/profileCard"
import cookie from 'react-cookies'
import UpdateUserForm from '../components/update-user-form'
import { Button } from '@material-ui/core';
export default class OtherProfiles extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showProfile: false,
            profile: '',
            logout: false,
            token: true,
            update: false,
            error: false
            // setOpen: false
        }
    }
    componentDidMount() {
        let url;
        if (this.props.match.params.id) {
            url = new URL(`http://localhost:3000/api/users/${this.props.match.params.id}`)
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
                if (!json.error) {
                    this.setState({ showProfile: true, profile: json });
                } else {
                    this.setState({ error: json.msg })
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    showError = () => {
        return this.state.error;
    }
    showProfile = () => {
        debugger
        if (this.state.showProfile) {
            debugger
            return (<div><ProfileCard
                {...this.state.profile}
                logout={this.state.logout}
                deleteAccount={this.state.deleteAccount}
            ></ProfileCard>
            </div>)
        }
        else {
            return this.state;
        }
    }
    handleClick = () => {
        this.setState({ update: true })
    }
    render() {
        return (
            <div className="body">
                <Total />
                {this.showProfile()}
            </div>
        )
    }
}