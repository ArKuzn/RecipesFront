
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './home';
import Profile from './Profile';
import Recipes from './Recipes';
import RecipePage from './RecipePage';
import OtherProfiles from './OtherProfiles';
import RecipeCreate from './RecipeCreate';
import store from '../store/store';
import PrivateRoute from '../components/private-route';


function App() {
  return (
    <Router>
      <div className="body">
        <Provider store={store}>
          <Route exact path="/" component={Home} />
          <Route path="/profile/:id" component={OtherProfiles} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route exact path="/recipes" component={Recipes} />
          <PrivateRoute exact path="/create" component={RecipeCreate} />
          <Route path="/recipes/:id" component={RecipePage} />
        </Provider>
      </div>
    </Router>
  );
}

export default App;
