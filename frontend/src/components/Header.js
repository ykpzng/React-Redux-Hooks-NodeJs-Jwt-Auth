import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";

import { history } from "../helpers/history";
import EventBus from "../common/EventBus";

export default function Header() {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [userBoard, setUserBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
      setUserBoard(currentUser.roles.includes("ROLE_USER"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark px-5">
        <Link to={"/"} className="navbar-brand">
          E-TurnSoft
        </Link>
        <div className="navbar-nav">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          {/* Only Moderator Pages */}
          {showModeratorBoard && (
            <>
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">Moderator</Link>
              </li>
              <li className="nav-item">
                <Link to={"/mod2"} className="nav-link">Moderator-2</Link>
              </li>
              <li className="nav-item">
                <Link to={"/mod3"} className="nav-link">Moderator-3</Link>
              </li>
            </>
          )}
          {/* Only Admin Pages */}
          {showAdminBoard && (
            <>
              <li className="nav-item ms-auto">
                <Link to={"/admin"} className="nav-link">Admin</Link>
              </li>
              <li className="nav-item">
                <Link to={"/admin2"} className="nav-link">Admin-2</Link>
              </li>
              <li className="nav-item">
                <Link to={"/admin3"} className="nav-link">Admin-3</Link>
              </li>
            </>
          )}
          {/* Only Pages, if you want current page => "currentUser &&..." , currentUser; means if there is any user*/}
          {userBoard && (
            <>
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">User</Link>
              </li>
            </>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
    </div>
  )
}
