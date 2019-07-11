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

let counterId = 0;

export default class IngredientsInputs extends Component {




    constructor(props) {
        super(props)
        this.state = {
            count: 1,
            ingredients: [
                {
                    id: 'ingredient 0',
                    value: '',
                    key: 0,
                }
            ]
        }

    }
    componentDidMount() {

        if (this.props.ingredients) {
            let newingredients = [];
            for (let ingredientId in this.props.ingredients) {
                let ingredient = {};
                ingredient.key = ++counterId;
                ingredient.id = `ingredient ${counterId}`;
                ingredient.value = this.props.ingredients[ingredientId].title;
                newingredients.push(ingredient);
            }
            const emptyIngredient = {};
            emptyIngredient.key = ++counterId;
            emptyIngredient.id = `ingredient ${counterId}`;
            emptyIngredient.value = '';
            newingredients.push(emptyIngredient);
            this.setState({ ingredients: newingredients })
        }
    }

    handleSubmit = (event) => {
        // debugger
        alert(`yay2`);
    }
    handleClose = () => {
        this.props.onBack(true);
    }
    addIngredient = (item) => {
        const oldObject = {};
        oldObject.value = '';
        oldObject.key = ++counterId;
        oldObject.id = `ingredient ${counterId}`;
        this.setState(prevState => ({
            ...prevState,
            ingredients: [...prevState.ingredients, oldObject]
        }));
        // debugger

    }
    deleteIngredient = (item) => {
        // debugger
        let ingredientsList = [...this.state.ingredients]
        for (let ingredientId in ingredientsList) {
            if (ingredientsList[ingredientId].id == item.id) {
                ingredientsList.splice(ingredientId, 1);
                this.setState({ ingredients: ingredientsList })
                // debugger
                console.log(ingredientsList)
            }
        }
    }
    BlurController = (event) => {
        // debugger
        // debugger
        if (event.currentTarget.value.length > 0) {
            if (event.currentTarget.id == this.state.ingredients[this.state.ingredients.length - 1].id) {

                return this.addIngredient(event.currentTarget)

            }
        }
        else {
            debugger
            if (event.currentTarget.id != this.state.ingredients[this.state.ingredients.length - 1].id) {
                return this.deleteIngredient(event.currentTarget)
            }
        }
    }
    onChangeInput = (e, ingredient) => {
        let newIngredient = { ...ingredient };
        newIngredient.value = e.currentTarget.value;
        let newIngredients = [...this.state.ingredients].map(item => item.id === ingredient.id ? newIngredient : item);
        this.setState({ ingredients: [...newIngredients] })
        // debugger
    }
    ingredients = () => {
        return (
            <div>
                {this.state.ingredients.map((ingredient, index) => {
                    return (
                        <TextField
                            value={ingredient.value}
                            margin="dense"
                            key={ingredient.key}
                            id={ingredient.id}
                            label={`Ingredient ${index + 1}`}
                            // type="text"
                            // autoFocus
                            onBlur={this.BlurController}
                            onFocus={this.FocusController}
                            onChange={(e) => this.onChangeInput(e, ingredient)}
                        />
                    )
                })}
            </div>
        );
    }
    render() {
        console.log('here');
        return (
            <div>
                {this.ingredients()}
            </div>
        )
    }
}