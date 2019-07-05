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
export default class StepsInputs extends Component {




    constructor(props) {
        super(props)
        this.state = {
            // setOpen: false
            count: 1,
            steps: [
                {
                    id: 0,
                    value: '',
                    image: '',
                    key: 0
                }
            ],
            last_step: 'step 0',
        }
    }
    addStep = (item) => {
        // debugger
        const emptyStep = {};
        emptyStep.key = ++counterId;
        emptyStep.id = +this.state.steps[this.state.steps.length - 1].id + 1;
        emptyStep.value = '';
        this.setState(prevState => ({
            ...prevState,
            steps: [...prevState.steps, emptyStep]
        }));

    }
    deleteStep = (item) => {
        let itemId = item.id.split(' ')[1];
        let stepList = [...this.state.steps]
        for (let stepId in stepList) {
            if (stepList[stepId].id == itemId) {
                stepList.splice(+stepId, 1);
                this.setState({ steps: stepList })
                // debugger
                console.log(stepList)
                break;
            }
        }


        // for (let stepId in this.state.steps) {
        //     if (this.state.steps[stepId].id == item.id) {
        //         this.state.steps.splice(stepId, 1);
        //         let newSteps = [];
        //         for (let id in this.state.steps) {
        //             let newStep = {};
        //             newStep.id = `step ${+id}`
        //             newStep.value = this.state.steps[id].value
        //             newSteps.push(newStep);
        //             // this.setState({ingredients[id]})
        //         }
        // let tmp = newIngredients[ingredientId];
        // newIngredients[ingredientId] = newIngredients[newIngredients.length - 1];
        // newIngredients[newIngredients.length - 1] = tmp;

        //         this.setState({ steps: newSteps })
        //         // debugger
        //     }
        // }
    }
    BlurController = (event) => {
        debugger
        if (event.currentTarget.value.length > 0) {
            // if(event.currentTarget.id==)
            // if (this.state.last_step) {

            //     return this.addStep(event.currentTarget)

            // }
            if (event.currentTarget.id.split(' ')[1] == this.state.steps[this.state.steps.length - 1].id) {

                return this.addStep(event.currentTarget)

            }
        }
        else {
            // if (!this.state.last_step) {
            //     return this.deleteStep(event.currentTarget)
            // }
            if (event.currentTarget.id.split(' ')[1] != this.state.steps[this.state.steps.length - 1].id) {
                return this.deleteStep(event.currentTarget)
            }
        }
    }
    handleUploadImageStep = (event) => {
        let id = event.currentTarget.id.split(' ')[1];
        this.state.steps[id].image = event.currentTarget.files[0].name;
        this.setState({ id: 2 })
        let file = {
            file: event.currentTarget.files[0],
            id: id
        };
        this.props.onUploadStepImage(
            file
        )
        // debugger
    }
    showImages = (id) => {
        // debugger
        return (
            <div>
                {this.state.steps[id].image}
            </div>
        )
    }
    onChangeInput = (e, step) => {
        let newStep = { ...step };
        newStep.value = e.currentTarget.value;
        let newSteps = [...this.state.steps].map(item => item.id === step.id ? newStep : item);
        this.setState({ steps: [...newSteps] })
        // debugger
    }
    steps = () => {
        // let steps_fields = [];
        // // debugger
        // for (let stepId in this.state.steps) {
        //     // debugger
        //     steps_fields.push(
        //         <div>
        //             <TextField
        //                 // value={steps.value}
        //                 margin="dense"
        //                 id={`step ${+stepId}`}
        //                 label={`Step ${+stepId + 1}`}
        //                 type="text"
        //                 onBlur={this.BlurController}
        //                 onFocus={this.FocusController}
        //                 multiline
        //                 rows="2"
        //                 variant="outlined"
        //                 // fullWidth
        //                 style={{ width: 500 }}
        //             />
        //             {this.showImages(stepId)}
        //             <input
        //                 id={`stepimage ${+stepId}`}
        //                 type="file"
        //                 style={{ display: 'none' }}
        //                 onChange={this.handleUploadImageStep} />
        //             <label htmlFor={`stepimage ${+stepId}`}>
        //                 <Button variant="raised" component="span"  >
        //                     Upload image for Step
        //                 </Button>
        //             </label>
        //         </div>
        //     )
        // }
        // // debugger
        // return (
        //     <div>
        //         {steps_fields}
        //     </div>
        // );
        console.log(this.state.steps);
        return (
            <div>
                {this.state.steps.map((step, index) => {
                    return (
                        <div>
                            <TextField
                                value={step.value}
                                margin="dense"
                                id={`step ${+step.id}`}
                                label={`Step ${+index + 1}`}
                                type="text"
                                onBlur={this.BlurController}
                                onFocus={this.FocusController}
                                onChange={(e) => this.onChangeInput(e, step)}
                                multiline
                                rows="2"
                                variant="outlined"
                                autoFocus
                                // fullWidth
                                style={{ width: 500 }}
                            />
                            {this.showImages(index)}
                            <input
                                id={`stepimage ${+index}`}
                                type="file"
                                style={{ display: 'none' }}
                                onChange={this.handleUploadImageStep} />
                            <label htmlFor={`stepimage ${+index}`}>
                                <Button variant="raised" component="span"  >
                                    Upload image for Step
                                    </Button>
                            </label>
                        </div>
                    )
                })}
            </div>
        )


    }
    render() {
        // const [open, setOpen] = React.useState(false);
        return (
            <div>
                {this.steps()}
            </div>
        )
    }
}