import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import cookie from 'react-cookies'
import ControllerLoginPopup from '../components/dialoglogincontrol'
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
            return (
                <Link to="/profile">Profile</Link>
            )
        }
        return (<ControllerLoginPopup onAuth={this.CheckAuth}></ControllerLoginPopup>)
    }
    CreateController = () => {
        if (this.state.Auth) {
            return (
                <li>
                    <Link to="/create">Create recipe</Link>
                </li>
            )
        }
        return (<div></div>)
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
                    {this.CreateController()}
                    <li>
                        <Link to="/recipes">Recipes</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                </ul>
            </div>
        )
    }
}