import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Total from "../components/Header"
export default class Recipe extends Component {
    render() {
        const value = this.props.value;
        return (
            <div>
                <Total test={'hi, prop its recipe'} />
                <h2>Recipeddd</h2>
            </div>

        )
    }
}