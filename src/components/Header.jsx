import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import cookie from 'react-cookies'
import ControllerLoginPopup from '../components/dialoglogincontrol'
import { Box } from '@material-ui/core';
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
                <Link activeClassName="active" className="header__item-a" to="/profile">Profile</Link>
            )
        }
        return (<ControllerLoginPopup onAuth={this.CheckAuth}></ControllerLoginPopup>)
    }
    CreateController = () => {
        if (this.state.Auth) {
            return (

                <Link activeClassName="active" className="header__item-a" to="/create">Create recipe</Link>

            )
        }
        return (<div></div>)
    }

    render() {
        return (
            <Box display="flex" flexDirection="row" className="header">

                <Link activeClassName="active" className="header__item-a" to="/">Home</Link>
                {this.ProfileController()}
                {this.CreateController()}
                <Link activeClassName="active" className="header__item-a" to="/recipes">Recipes</Link>

            </Box >
        )
    }
}