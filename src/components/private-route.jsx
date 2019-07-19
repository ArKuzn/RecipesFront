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


class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Auth: false,
    };
  }

  // Auth = () => {
  //   debugger
  //   if (this.props.user.login) {
  //     return this.setState({ Auth: true });
  //   }
  //   return null;
  // }
  Redirect = () => {
    cookie.remove('token', { path: '/' });
    return (
      <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />
    );
  }

  PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => this.props.user.login ? <Component {...props} /> : this.Redirect()
        }
      />
    );
  };

  render() {
    return (
      <div className="body__recipe">
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

export default enchancer(PrivateRoute);
