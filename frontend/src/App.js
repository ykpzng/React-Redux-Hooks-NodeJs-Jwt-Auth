import React from "react";
import { useSelector } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import LoginPage from "./screens/LoginPage";
import RegisterPage from "./screens/RegisterPage";
import HomePage from "./screens/HomePage";
import ProfilePage from "./screens/ProfilePage";
import Header from "./components/Header";
import { logout } from "./actions/auth";
import { history } from "./helpers/history";
// import AuthVerify from "./common/AuthVerify";

import BoardUser from "./screens/BoardUser";
import BoardModerator from "./screens/BoardModerator";
import BoardAdmin from "./screens/BoardAdmin";
import BoardModerator2 from "./screens/BoardModerator2";
import BoardModerator3 from "./screens/BoardModerator3";
import BoardAdmin2 from "./screens/BoardAdmin2";
import BoardAdmin3 from "./screens/BoardAdmin3";
import ProtectedModRoute from './protected/ProtectedModRoute'
import ProtectedAdminRoute from './protected/ProtectedAdminRoute'
import ProtectedUserRoute from './protected/ProtectedUserRoute'
import Page404 from "./pages/Page404";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const moderator = user?.roles?.includes("ROLE_MODERATOR");
  const admin = user?.roles?.includes("ROLE_ADMIN");
  const _user = user?.roles?.includes("ROLE_USER");
  console.log("Moderator:", moderator)
  console.log("Admin:", admin)
  console.log("User:", _user)

  return (
    <Router history={history}>
      <div>
        <Header />
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/profile" component={ProfilePage} />
            <ProtectedUserRoute path="/user" component={BoardUser} isAuth={_user} />
            <ProtectedModRoute path="/mod" component={BoardModerator} isAuth={moderator} />
            <ProtectedModRoute path="/mod2" component={BoardModerator2} isAuth={moderator} />
            <ProtectedModRoute path="/mod3" component={BoardModerator3} isAuth={moderator} />
            <ProtectedAdminRoute path="/admin" component={BoardAdmin} isAuth={admin} />
            <ProtectedAdminRoute path="/admin2" component={BoardAdmin2} isAuth={admin} />
            <ProtectedAdminRoute path="/admin3" component={BoardAdmin3} isAuth={admin} />
            <Route path="*" component={Page404} />
          </Switch>
        </div>

        {/* <AuthVerify logOut={logout} /> */}
      </div>
    </Router>
  );
};

export default App;
