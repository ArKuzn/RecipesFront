import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import user from "../components/user"
import Total from "../components/Header"
import ProfileCard from "../components/profileCard"
import cookie from 'react-cookies'
export default class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showProfile: false,
            profile: '',
            logout: false,
            token: true
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
            this.setState({ logout: true });
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
            return (<ProfileCard
                {...this.state.profile}
                logout={this.state.logout}
            ></ProfileCard>)
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
                <h2>Profiledd</h2>
                {this.Redirect()}
            </div>
        )
    }
}