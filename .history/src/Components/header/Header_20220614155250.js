import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

export default ({ match: { url } }) => {
  return (
    <header className="header__body">
      <nav className="header__navbar">
        <div className="header__newStory">
          {url === "/" ? (
            <Link to="/new" className="btn btn-new">
              New Story
            </Link>
          ) : (
            <Link to="/" className="btn btn-new">
              Home
            </Link>
          )}
        </div>
        <div className="header__bookmarks">
          <Link to="/bookmark" className="btn btn-bookmarks">
            Bookmarks
          </Link>
        </div>
        <div className="header__bookmarks">
          <Link
            to="/bookmark"
            className="btn btn-bookmarks"
            onClick={() => {
              localStorage.setItem("token", JSON.stringify({ logged: false }));
            }}
          >
            Logout
          </Link>
        </div>
        <div className="logout">
          <button>Logout</button>
        </div>
      </nav>
    </header>
  );
};
