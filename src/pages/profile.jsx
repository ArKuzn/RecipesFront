import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import user from "../components/user"
import Total from "../components/Header"
export default class Profile extends React.Component {

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
                {value}
                <div>You are now at</div>
                <Total test={'hi, prop, its profile'} />
                <h2>Profiledd</h2>
            </div>
        )
    }
}