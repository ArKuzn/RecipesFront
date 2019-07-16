import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
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
                <CreateRecipeForm onSubmit={this.handeSubmit} onBack={this.Back}></CreateRecipeForm>

            </div>
        )

    }
    Redirect = () => {
        this.props.history.push('/');

        if (this.state.redirect) {
            return (
                <Redirect to={{
                    pathname: "/",
                    // state: { from: props.location }
                }} />
            )
        }
    }
    handleClick = (event, files, stepsimages) => {
        alert(`yay`)
    }
    handeSubmit = (event, files, stepsimages) => {
        debugger
        event.preventDefault();
        // console.log(event.target.elements['title'].value);
        let ingredients = [];
        let steps = [];
        // console.log(event.target.elements[`ingredient`])
        for (let element in event.target.elements) {
            try {
                if (event.target.elements[element].id.split(" ")[0] == "ingredient") {
                    ingredients.push(event.target.elements[element].value)
                }
                if (event.target.elements[element].id.split(" ")[0] == "step") {
                    steps.push(event.target.elements[element].value)
                }
            } catch{

            }
        }
        ingredients.length = ingredients.length - 1;
        steps.length = steps.length - 1;
        ingredients = ingredients.join('|');
        steps = steps.join('|');




        let params = {
            title: event.target.elements["title"].value,
            calories: event.target.elements["calories"].value,
            difficult: event.target.elements["difficult"].value,
            duration: event.target.elements["duration"].value,
            ingredients: ingredients,
            steps: steps,
            token: cookie.load('token')
        };
        debugger
        let formData = new FormData()
        for (let fileId in files) {
            debugger
            formData.append("images", files[fileId])
        }
        for (let fileId in stepsimages) {
            debugger
            formData.append("stepsimages", stepsimages[fileId])
        }
        formData.append("ingredients", ingredients)
        formData.append("title", event.target.elements["title"].value)
        formData.append("calories", event.target.elements["calories"].value)
        formData.append("difficult", event.target.elements["difficult"].value)
        formData.append("duration", event.target.elements["duration"].value)
        formData.append("steps", steps)
        formData.append("token", cookie.load('token'))
        debugger
        // for (var k in params) {
        //     formData.append(event.target[k].id, params[k].value);

        // }




        fetch(`http://localhost:3000/api/recipes`, {
            method: 'POST',

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
                    this.setState({ redirect: true })
                }
            })
            .catch(error => {
                console.log(error);
            });

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

export default withRouter(RecipeCreate)


