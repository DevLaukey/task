import React from "react";
import Bookmarks from "./Bookmarks";

export default ({ bookmarks }) => {
  return (
    <div className="bookmark-page">
      <h1 className="bookmark__h1">Your Bookmarks</h1>
      <Bookmarks bookmarks={bookmarks} />
    </div>
  );
};
