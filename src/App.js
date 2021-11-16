import './App.css';
import {
  BrowserRouter as Router, Switch, Route,
} from "react-router-dom";
import Login from './Pages/Home/Login/Login';
import Navigation from './Pages/Home/Navigation/Navigation';
import Home from './Pages/Home/Home/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/users">

        </Route>

      </Switch>
    </Router>
  );
}

export default App;
