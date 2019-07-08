import React, { Component, PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class FavoriteButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorite: false
        }
    }
    componentDidMount() {
        // debugger
        // alert(`yay`);
        this.setState({ favorite: this.props.favorite })
    }
    // static getDerivedStateFromProps(props, state) {
    //     debugger
    //     // state.setState({ favorite: props.favorite })
    // }

    componentDidUpdate(prevProps) {
        // debugger
        if (this.props.favorite != prevProps.favorite) {
            this.setState({ favorite: this.props.favorite, id: this.props.id })
        }
        // alert(`yay2`);
        // this.setState({ favorite: false })
    }
    ClickHandler = () => {
        //    localhost:3000/api/recipes/favorite/4


        var formBody = [];
        formBody.push('token' + '=' + this.props.token)
        formBody = formBody.join("&");
        console.log(JSON.stringify(formBody));

        fetch(`http://localhost:3000/api/recipes/favorite/${this.props.id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        })
            .then(response => {

                if (response.ok) {
                    return response.json();
                }

                throw new Error("Network response was not ok");
            })
            .then(json => {

                if (!json.error) {
                    this.setState({ favorite: (this.state.favorite) ? false : true })
                }


            })
            .catch(error => {
                console.log(error);
            });

    }
    favoriteButton = () => {
        // debugger
        // this.setState({ favorite: this.props.favorite });
        let text = (this.state.favorite) ? 'remove from favorite' : 'add to favorite'
        debugger
        if (this.props.token)
            return (
                <div class="item__text-favorite">
                    <p class="item__text-name-p">
                        <button onClick={this.ClickHandler}>{text}</button>


                    </p>
                </div>
            )
        else
            return (
                <div></div>
            )
    }

    render() {
        // debugger
        return (
            <div>
                {this.favoriteButton()}
            </div>
        )
    }
}