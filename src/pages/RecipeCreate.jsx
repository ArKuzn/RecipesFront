import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import user from "../components/user"
import Total from "../components/Header"
import ProfileCard from "../components/profileCard"
import cookie from 'react-cookies'
import UpdateUserForm from '../components/update-user-form'
import { Button } from '@material-ui/core';
import CreateRecipeForm from '../components/recipe-creator-form'
export default class RecipeCreate extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showPage: false,
            logout: false,
            token: true,
            update: false,
            redirect: false
            // setOpen: false
        }
    }
    componentDidMount() {
        let url;

        if (!cookie.load('token')) {
            this.setState({ redirect: true });
        }

    }
    Back = () => {
        this.setState({ redirect: true })
    }
    showPage = () => {

        return (
            <div>
                <CreateRecipeForm onBack={this.Back}></CreateRecipeForm>

            </div>
        )

    }
    Redirect = () => {
        if (this.state.redirect) {
            return (
                <Redirect to={{
                    pathname: "/",
                    // state: { from: props.location }
                }} />
            )
        }
    }
    handleClick = () => {
        alert(`yay`)
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
                <Total />

                <h2>Create Recipe</h2>
                {this.showPage()}
                {this.Redirect()}
            </div>
        )
    }
}