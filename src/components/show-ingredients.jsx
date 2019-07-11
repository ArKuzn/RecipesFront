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

export default class IngredientsShow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // setOpen: false
        }

    }


    showIngredients = () => {
        // debugger
        let ingredients = [];
        for (let ingredient in this.props.ingredients) {
            if (ingredient < this.props.ingredients.length - 1) {
                ingredients.push(
                    <span class="item__text-ingredients-span">{this.props.ingredients[ingredient].title}, </span>
                );
            }
            else {
                ingredients.push(
                    <span class="item__text-ingredients-span">{this.props.ingredients[ingredient].title}</span>
                );
            }
        }
        return ingredients;
    }





    render() {
        // const [open, setOpen] = React.useState(false);
        return (
            <div class="wrapper">
                {this.showIngredients()}
            </div >
        )
    }
}