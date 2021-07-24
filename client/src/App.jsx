import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Settings from "./components/settings/Settings";
import Topbar from "./components/topbar/Topbar";
import Write from "./components/write/Write";
import Single from "./single/Single";

import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Context } from "./context/Context";
function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/write">{user ? <Write /> : <Register />}</Route>
        <Route path="/settings">{user ? <Settings /> : <Register />}</Route>
        <Route path="/post/:postid">
          <Single />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
