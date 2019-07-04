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
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import clsx from 'clsx';

export default class IngredientsInputs extends Component {




    constructor(props) {
        super(props)
        this.state = {
            // setOpen: false
            count: 1,
            ingredients: [
                {
                    id: 'ingredient 0',
                    value: ''
                }
            ],
            last_ingredient: 'ingredient 0'
        }
    }

    handleSubmit = (event) => {
        // debugger
        alert(`yay2`);
    }
    handleClose = () => {
        this.props.onBack(true);
    }
    // handleChange = name => event => {
    //     // this.setValues({ ...this.state.values, [name]: event.target.value });
    //     debugger
    //     alert('yay')
    // };
    addIngredient = (item) => {
        // debugger
        let ingredient = {};
        ingredient.id = item.id;
        ingredient.value = item.value;
        this.state.ingredients[this.state.ingredients.length - 1] = ingredient;
        let emptyingredient = {};
        emptyingredient.id = `ingredient ${this.state.ingredients.length}`;
        emptyingredient.value = '';
        this.setState({ last_ingredient: `ingredient ${this.state.ingredients.length}` });
        this.state.ingredients.push(emptyingredient);

    }
    deleteIngredient = (item) => {
        for (let ingredientId in this.state.ingredients) {
            if (this.state.ingredients[ingredientId].id == item.id) {
                this.state.ingredients.splice(ingredientId, 1);
                let newIngredients = [];
                for (let id in this.state.ingredients) {
                    let newIngredient = {};
                    newIngredient.id = `ingredient ${+id}`
                    newIngredient.value = this.state.ingredients[id].value
                    newIngredients.push(newIngredient);
                    // this.setState({ingredients[id]})
                }
                // let tmp = newIngredients[ingredientId];
                // newIngredients[ingredientId] = newIngredients[newIngredients.length - 1];
                // newIngredients[newIngredients.length - 1] = tmp;
                console.log(newIngredients)
                this.setState({ ingredients: newIngredients })
                // debugger
            }
        }
    }
    BlurController = (event) => {
        // debugger
        if (event.currentTarget.value.length > 0) {
            // if(event.currentTarget.id==)
            // if (this.state.last_ingredient) {

            //     return this.addIngredient(event.currentTarget)

            // }
            if (event.currentTarget.id == this.state.last_ingredient) {

                return this.addIngredient(event.currentTarget)

            }
        }
        else {
            // if (!this.state.last_ingredient) {
            //     return this.deleteIngredient(event.currentTarget)
            // }
            if (event.currentTarget.id != this.state.last_ingredient) {
                return this.deleteIngredient(event.currentTarget)
            }
        }
    }
    // FocusController = (event) => {
    //     // debugger
    //     if (event.currentTarget.value.length > 0) {
    //         this.setState({ last_ingredient: false })
    //     }
    //     else
    //         this.setState({ last_ingredient: true })

    // }
    ingredients = () => {
        let ingredients_fields = [];
        let last_id = 0;
        // debugger
        for (let ingredientId in this.state.ingredients) {

            ingredients_fields.push(
                <TextField
                    defaultValue={this.state.ingredients[ingredientId].value}
                    margin="dense"
                    id={`ingredient ${+ingredientId}`}
                    label={`Ingredient ${+ingredientId + 1}`}
                    type="text"
                    onBlur={this.BlurController}
                    onFocus={this.FocusController}
                />
            )
            last_id++;
        }
        // debugger
        console.log(ingredients_fields)
        return (
            <div>
                {ingredients_fields}
            </div>
        );
    }
    render() {
        // const [open, setOpen] = React.useState(false);
        return (
            <div>
                {this.ingredients()}
            </div>
        )
    }
}