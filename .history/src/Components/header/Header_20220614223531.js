import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { create_context} from '../../context/index'

export default ({ match: { url } }) => {
  const { logoutFunc } = React.useContext(create_context);
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
            onClick={() => logoutFunc()
          >
            Logout
          </Link>
        </div>
      
      </nav>
    </header>
  );
};
