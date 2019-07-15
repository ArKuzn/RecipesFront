import React, { Component, PropTypes } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import user from "./user";
import Total from "./Header";
import ProfileCard from "./profileCard";
import cookie from "react-cookies";
import UpdateUserForm from "./update-user-form";
import { Button } from "@material-ui/core";
import CreateRecipeForm from "./recipe-creator-form";
export default class DeleteRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Author: false,
      token: true
    };
  }
  componentDidMount() {
    if (!cookie.load("token")) {
      this.setState({ Author: false });
      // this.setState({ redirect: true });
    } else {
      let url;
      let params = { token: cookie.load("token") };
      url = new URL("http://localhost:3000/api/users/profile");
      url.search = new URLSearchParams(params);
      fetch(url, { method: "GET" })
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          throw new Error("Network response was not ok");
        })
        .then(json => {
          // this.setState({ userId: json.id });
          if (this.props.author == json.id) {
            this.setState({ Author: true });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  delete = () => {
    debugger;
    let url = new URL(`http://localhost:3000/api/recipes/${this.props.id}`);
    let params = { token: cookie.load("token") };
    url.search = new URLSearchParams(params);
    fetch(url, {
      method: "DELETE"
    })
      .then(response => {
        debugger;
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then(json => {
        debugger;
        if (!json.error) {
          this.props.onDeleted(true);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  showButton = () => {
    if (this.state.Author) {
      return <button onClick={this.delete}>Delete recipe</button>;
    }
  };
  render() {
    return <div>{this.showButton()}</div>;
  }
}
