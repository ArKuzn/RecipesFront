import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Total from "../components/Header"
export default class Home extends Component {
    render() {
        const value = this.props.test;
        return (

            <div>
                <Total test={'hi, prop, its home'} />
                <span>{value}</span>
                <h2>Home Two</h2>
            </div>

        )
    }
}