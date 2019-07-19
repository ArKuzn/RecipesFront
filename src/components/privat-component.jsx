import { connect } from 'react-redux';
import React, { Component } from 'react';
import cookie from 'react-cookies';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import { setUser } from '../store/user/actions';


class PrivateComponent extends Component {
  PrivateRoute = ({ component: Component, HandlerUnAuth = false, ...rest }) => {
    debugger
    return (
      <Route
        {...rest}
        // render={props => this.props.user.login ? <Component {...rest} /> : null
        render={props => this.props.user.login ?
          <Component {...rest} />
          :
          HandlerUnAuth
            ? <HandlerUnAuth {...rest} />
            : null
        }
      />
    );
  };

  // HandlerunAuth = (...rest) => {
  //   try {
  //     return <HandlerAuth {...rest} />
  //   } catch (err) {
  //     return null
  //   }
  // }

  render() {
    return (
      <div className="head__link">
        {/* {this.Auth()} */}
        {this.PrivateRoute(this.props)}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.userStore.user,
  };
};
const mapDispatchToProps = {
  setUser,
};
const enchancer = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default enchancer(PrivateComponent);
