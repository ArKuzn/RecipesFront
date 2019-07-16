import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import cookie from 'react-cookies'

export default class StepsShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // setOpen: false
            Auth: true
        }

    }

    redirect = () => {
        // debugger
        if (!this.state.Auth) {
            return (<Redirect to={{
                pathname: "/",
                // state: { from: props.location }
            }} />)
        }
    }
    logout = () => {
        // debugger
        cookie.remove('token', { path: '/' })
        this.setState({ Auth: false });
    }
    logoutBtn = () => {
        if (this.props.logout) {
            return (<span class="logout" onClick={this.logout}>Logout</span>)
        }
    }


    steps = () => {
        // debugger
        if (this.props.steps.length)
            return (
                <div>
                    {this.props.steps.map((step, index) => {
                        return (
                            <div class="step">
                                <div class="step__count">Step {index + 1}</div>
                                <div class="step__content">
                                    <div class="step__content-text">{step.text}</div>
                                    <div class="step__content-image"><img class="step__content-image-img" src={`http://localhost:3000/api/${step.image}`}></img></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        else
            return null
    }





    render() {
        // const [open, setOpen] = React.useState(false);
        return (
            <div class="wrapper">
                {this.steps()}
            </div >
        )
    }
}