
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Total from "../components/Header"
import Home from "../pages/home"
import Profile from "../pages/Profile"
import Recipes from "./Recipes"
import RecipePage from "./RecipePage"
import OtherProfiles from "./OtherProfiles"

import RecipeCreate from "../pages/RecipeCreate"
function App() {
  return (
    <Router>

      <div class="body">
        <Route exact path="/" component={Home} />
        <Route path="/profile/:id" component={OtherProfiles} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/recipes" component={Recipes} />
        <Route exact path="/create" component={RecipeCreate} />
        <Route path="/recipes/:id" component={RecipePage} />
      </div>
    </Router>
  );
}

export default App;