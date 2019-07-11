import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import user from "./user"
import Total from "./Header"
import ProfileCard from "./profileCard"
import cookie from 'react-cookies'
import UpdateUserForm from './update-user-form'
import { Button } from '@material-ui/core';
import CreateRecipeForm from './recipe-creator-form'
export default class RecipeEdit extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            logout: false,
            update: false,
            redirect: false,
            // setOpen: false
        }
    }
    componentDidMount() {
        // debugger




    }
    Back = () => {
        this.setState({ redirect: true })
    }
    showPage = () => {
        // debugger

        return (
            <div>
                <CreateRecipeForm
                    onSubmit={this.handleSubmit}
                    onBack={this.Back}
                    id={this.props.id}
                    author={this.props.author}
                    title={this.props.title}
                    images={this.props.images}
                    ingredients={this.props.ingredients}
                    steps={this.props.steps}
                    duration={this.props.duration}
                    difficult={this.props.difficult}
                    calories={this.props.calories}
                ></CreateRecipeForm>

            </div>
        )
    }
    Redirect = () => {
        if (this.state.redirect) {
            return (
                <Redirect to={{
                    pathname: "/recipes",
                    // state: { from: props.location }
                }} />
            )
        }
    }
    handleSubmit = (event, files, stepsimages) => {
        // debugger
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
        // debugger
        let formData = new FormData()
        for (let fileId in files) {
            // debugger
            formData.append("images", files[fileId])
        }
        for (let fileId in stepsimages) {
            // debugger
            formData.append("stepsimages", stepsimages[fileId])
            formData.append("ImageNumber", fileId)
        }
        formData.append("ingredients", ingredients)
        formData.append("title", event.target.elements["title"].value)
        formData.append("calories", event.target.elements["calories"].value)
        formData.append("difficult", event.target.elements["difficult"].value)
        formData.append("duration", event.target.elements["duration"].value)
        formData.append("steps", steps)
        formData.append("token", cookie.load('token'))
        // debugger
        // for (var k in params) {
        //     formData.append(event.target[k].id, params[k].value);

        // }




        fetch(`http://localhost:3000/api/recipes/${this.props.id}`, {
            method: 'PUT',

            body: formData,

        })
            .then(response => {
                // debugger
                if (response.ok) {
                    return response.json();
                }

                throw new Error("Network response was not ok");
            })
            .then(json => {
                // debugger
                if (!json.error) {
                    this.setState({ redirect: true })
                }
            })
            .catch(error => {
                console.log(error);
            });

    }

    render() {

        return (
            <div>
                {this.showPage()}
                {this.Redirect()}
            </div>
        )
    }
}