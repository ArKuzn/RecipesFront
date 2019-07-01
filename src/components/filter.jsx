import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.state = {
            data: {},
            errors: {}
        }
    }
    showImages = () => {
        // let test = JSON.parse(this.props.images);

        console.log('images is ' + this.props.images)
        let images = [];
        for (let i = 0; i < this.props.images.length; i++) {
            images.push(
                <div class="item__image">
                    <img class="item__image-img" src={'http://localhost:3000/' + this.props.images[i]} />
                </div>
            )
        }
        return images;
    }
    handleSubmit(event) {
        // console.log(event.target.elements['rank'].value);
        // console.log(event.target.elements['durationTo'].value);
        let ingredients = '';
        for (let i = 3; i < event.target.length; i++) {
            if (event.target[i].checked) {
                ingredients += event.target[i].value + '-';
            }
        }
        ingredients = ingredients.substr(0, ingredients.length - 1)
        let order_field = event.target.elements['rank'].value.split('-')[0];
        let direction = event.target.elements['rank'].value.split('-')[1];
        let duration = event.target.elements['durationFrom'].value + '-' + event.target.elements['durationTo'].value;
        let params = { ingredients: ingredients, order_field, direction, duration: duration }
        debugger
        let url = new URL('http://localhost:3000/api/recipes/filter/da')
        url.search = new URLSearchParams(params)
        fetch(url, { method: "GET" })
            .then(response => {
                debugger
                if (response.ok) {
                    return response.json();
                }

                throw new Error("Network response was not ok");
            })
            .then(json => {
                debugger
                console.log('recipes is' + JSON.stringify(this.recipes));
                this.setState({ recipes: json });
                console.log('recipes state is' + JSON.stringify(this.state.recipes));
            })
            .catch(error => {
                console.log(error);
            });

        event.preventDefault();
    }
    handleInput = event => {

        // let { value, name } = event.currentTarget;
        // let chk = [name];
        // event.currentTarget.type === 'checkbox' ? value += this.state.ingredients : alert('lyl');
        // alert(value);
        // this.setState(({ data, errors }) => ({
        //     data: {
        //         ...data,
        //         [name]: value,
        //     },
        //     errors: {
        //         ...errors,
        //         [name]: '',
        //     },
        // }));
    };
    render() {
        const value = this.props.test;
        return (
            <div class="filter">
                <form class="filter__form" onSubmit={this.handleSubmit}>
                    <label class="duration">
                        duration from
                        <input name="durationFrom" type="text" class="duration__from" onChange={this.handleInput} />
                        to
                        <input name="durationTo" type="text" class="duration__to" onChange={this.handleInput} />
                    </label>
                    <label class="rank">
                        rank
                    <select name="rank" onChange={this.handleInput}>
                            <option value="title-ASC">name up</option>
                            <option value="title-DESC">name down</option>
                            <option value="difficult-ASC">difficult up</option>
                            <option value="difficult-DESC">difficult down</option>
                        </select>
                    </label>
                    <div class="ingredients">
                        <label class="ingredient1">
                            <input type="checkbox" name="ingredients" value="Car" onChange={this.handleInput} /> I have a car
                    </label>
                        <label class="ingredient2">
                            <input type="checkbox" name="ingredients" value="Car2" onChange={this.handleInput} /> I have a car2
                    </label>
                    </div>
                    <input type="submit" />
                </form>
            </div >
        )
    }
}

/**
 *
 *
 *
  <form class="filter__form">
        <input type="text" class="duration__from" />
        <input type="text" class="duration__to" />
<select value={optionsState}>
    <option value="1">name up</option>
    <option value="2">name down</option>
    <option value="3">difficult up</option>
    <option value="4">difficult down</option>
</select>

    </form>
 */