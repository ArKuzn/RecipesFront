
import React from 'react';
import cookie from 'react-cookies';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import config from '../config';

import Home from './home';
import Profile from './Profile';
import Recipes from './Recipes';
import RecipePage from './RecipePage';
import OtherProfiles from './OtherProfiles';
import RecipeCreate from './RecipeCreate';
import Helpers from '../api/hs';
import store from '../store/store';
import { setUser } from '../store/user/actions';
import PrivateRoute from '../components/private-route';
import WorkDates from './WorkDates';
import Total from '../components/Header';

if (cookie.load('token')) {
  // const params = { token: User.payload };
  const params = { token: cookie.load('token') };
  const url = new URL(`${config.apiUrl}/users/profile`);
  url.search = new URLSearchParams(params);

  store.dispatch(() => {
    Helpers.httpRequest(
      url,
      'GET',
    ).then((response) => {
      if (!response.error) {
        store.dispatch(setUser(response.msg));
      } else {
        cookie.remove('token');
      }
    })
      .catch((error) => {
        console.log(error);
      });
  });
}


function App() {
  return (
    <Router>
      <div className="body">
        <Provider store={store}>
          <Total />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/profile/:id" component={OtherProfiles} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <Route exact path="/recipes" component={Recipes} />
            <PrivateRoute exact path="/create" component={RecipeCreate} />
            <Route exact path="/recipes/:id" component={RecipePage} />
            <Route exact path="/workdates" component={WorkDates} />
            <Route path="/" component={() => <Redirect to="/" />} />
          </Switch>
        </Provider>
      </div>
    </Router>
  );
}

// const routes = [
//   {
//     exact: true,
//     path: '',
//     component: null
//   }
// ]

export default App;
