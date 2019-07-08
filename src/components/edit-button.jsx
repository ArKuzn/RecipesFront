import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import user from "./user"
import Total from "./Header"
import ProfileCard from "./profileCard"
import cookie from 'react-cookies'
import UpdateUserForm from './update-user-form'
import { Button } from '@material-ui/core';
import CreateRecipeForm from './recipe-creator-form'
export default class EditButton extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            Author: false,
            token: true,
            edit: false,
            // setOpen: false
        }
    }
    componentDidMount() {
        debugger
        if (!cookie.load('token')) {
            this.setState({ Author: false })
            // this.setState({ redirect: true });
        } else {
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
                    // this.setState({ userId: json.id });
                    if (this.props.author == json.id) {
                        this.setState({ Author: true })
                    }
                })
                .catch(error => {
                    console.log(error);
                });

        }
    }
    showPage = () => {
        debugger
        if (this.state.Author) {
            return (
                <button onClick={() => { this.props.onEdit(true) }}>Edit</button>
            )
        }
    }
    render() {

        return (
            <div>
                {this.showPage()}
            </div>
        )
    }
}