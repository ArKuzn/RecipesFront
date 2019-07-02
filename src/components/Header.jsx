import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginPopup from "../components/login"
import cookie from 'react-cookies'
export default class Total extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Auth: false
        }
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
            return (<Link to="/profile">Profile</Link>)
        }
        return (<LoginPopup onAuth={this.CheckAuth}></LoginPopup>)
    }
    render() {
        const value = this.props.test;
        return (
            <div class="wrapper">
                <span>{value}</span>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        {/* <Link to="/profile">Login/Register</Link> */}
                        {/* <LoginPopup></LoginPopup> */}
                        {this.ProfileController()}
                    </li>
                    <li>
                        <Link to="/recipes">Recipe</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                </ul>
            </div>
        )
    }
}