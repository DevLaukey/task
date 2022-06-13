import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

export default ({ match: { url } }) => {
  return (
    <header>
      <nav className="navbar">
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
       
      </nav>
    </header>
  );
};
