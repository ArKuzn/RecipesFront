import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Total extends Component {
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
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/recipe">Recipe</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                </ul>
            </div>
        )
    }
}