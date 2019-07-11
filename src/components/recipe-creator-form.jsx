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
            stepsimages: [],
            recipe: {},
            submitText: 'Create'
        }
    }
    componentDidMount() {
        // debugger
        // alert('lol')
        if (this.props.title) {
            this.setState({ submitText: 'Edit' })
        }
    }
    handleSubmit = (event) => {
        this.props.onSubmit(event, this.state.files, this.state.stepsimages)
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
        // debugger
        // this.state.stepImages.push({
        //     name: file.name,
        //     id: id
        // })
        this.state.stepsimages[file.id] = file.file;

    }
    render() {
        // const [open, setOpen] = React.useState(false);
        // debugger
        console.log(this.state.recipe)
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
                    defaultValue={this.props.title}
                    required
                />
                <TextField
                    margin="dense"
                    id="calories"
                    label="Calories"
                    type="number"
                    defaultValue={this.props.calories}
                />
                <TextField
                    margin="dense"
                    id="difficult"
                    label="Difficult"
                    type="number"
                    defaultValue={this.props.difficult}
                />
                <TextField
                    margin="dense"
                    id="duration"
                    label="Duration"
                    type="number"
                    defaultValue={this.props.duration}
                />
                <IngredientsInputs
                    ingredients={this.props.ingredients}
                ></IngredientsInputs>
                <StepsInputs
                    steps={this.props.steps}
                    onUploadStepImage={this.handleUploadStepImage}
                ></StepsInputs>
                <Button onClick={this.handleClose} color="primary">
                    Back to home
                </Button>

                <Button type="submit" color="primary">
                    {this.state.submitText}
                </Button>
            </form>
        )
    }
}