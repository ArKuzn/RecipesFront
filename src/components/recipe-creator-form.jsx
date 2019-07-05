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
import IngredientsInputs from '../components/ingredients'
import StepsInputs from '../components/steps'
import { DropzoneArea } from 'material-ui-dropzone'
export default class CreateRecipeForm extends Component {




    constructor(props) {
        super(props)
        this.state = {
            // setOpen: false
            files: [],
            stepsimages: []
        }
    }

    handleSubmit = (event) => {
        debugger
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
        debugger
        let formData = new FormData()
        for (let fileId in this.state.files) {
            debugger
            formData.append("images", this.state.files[fileId])
        }
        for (let fileId in this.state.stepsimages) {
            debugger
            formData.append("stepsimages", this.state.stepsimages[fileId])
        }
        formData.append("ingredients", ingredients)
        formData.append("title", event.target.elements["title"].value)
        formData.append("calories", event.target.elements["calories"].value)
        formData.append("difficult", event.target.elements["difficult"].value)
        formData.append("duration", event.target.elements["duration"].value)
        formData.append("steps", steps)
        formData.append("token", cookie.load('token'))
        debugger
        // for (var k in params) {
        //     formData.append(event.target[k].id, params[k].value);

        // }




        fetch(`http://localhost:3000/api/recipes`, {
            method: 'POST',

            body: formData,

        })
            .then(response => {
                debugger
                if (response.ok) {
                    return response.json();
                }

                throw new Error("Network response was not ok");
            })
            .then(json => {
                debugger
                if (!json.err_field) {
                    this.props.onClose(true);
                }
                else {
                    for (let err_field of json.err_field) {
                        if (err_field == "password") {
                            this.setState({ err_pass: true });
                        }
                    }
                }

            })
            .catch(error => {
                console.log(error);
            });
    }
    handleClose = () => {
        this.props.onBack(true);
    }
    handleChange(files) {
        this.setState({
            files: files
        });
    }
    handleUploadStepImage = (file) => {
        debugger
        // this.state.stepImages.push({
        //     name: file.name,
        //     id: id
        // })
        this.state.stepsimages[file.id] = file.file;

    }
    render() {
        // const [open, setOpen] = React.useState(false);
        return (
            <form class="Recipe_creator__form" onSubmit={this.handleSubmit}>
                <DropzoneArea
                    onChange={this.handleChange.bind(this)}
                />
                <TextField
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"

                />
                <TextField
                    margin="dense"
                    id="calories"
                    label="Calories"
                    type="number"
                />
                <TextField
                    margin="dense"
                    id="difficult"
                    label="Difficult"
                    type="number"
                />
                <TextField
                    margin="dense"
                    id="duration"
                    label="Duration"
                    type="number"
                />
                <IngredientsInputs></IngredientsInputs>
                <StepsInputs onUploadStepImage={this.handleUploadStepImage}></StepsInputs>
                <Button onClick={this.handleClose} color="primary">
                    Back to home
                </Button>

                <Button type="submit" color="primary">
                    Create
                </Button>
            </form>
        )
    }
}