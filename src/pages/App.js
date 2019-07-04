
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Total from "../components/Header"
import Home from "../pages/home"
import Profile from "../pages/Profile"
import Recipes from "./Recipes"
import RecipeCreate from "../pages/RecipeCreate"
function App() {
  return (
    <Router>

      <div>
        <Route exact path="/" component={Home} />
        <Route path="/profile/:id" component={Profile} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/recipes" component={Recipes} />
        <Route exact path="/create" component={RecipeCreate} />
        <Route path="/recipes/:id" component={Recipes} />
      </div>
    </Router>
  );
}

// function Home() {
//   return <h2>Home</h2>;
// }

function About() {
  return <h2>About</h2>;
}

function Topic({ match }) {
  return <h3>Requested Param: {match.params.id}</h3>;
}

function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:id`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

export default App;