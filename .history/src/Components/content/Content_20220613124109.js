import React from "react";
import Bookmarks from "./Bookmarks";
import "./content.css"
import Posts from "./Posts";

export default ({ posts, bookmarks, handleBookmark, handleRemoveBookmark }) => {
  return (
    <div className="content-area">
      <div className="all-posts">
        <Posts
          posts={posts}
          handleBookmark={handleBookmark}
          handleRemoveBookmark={handleRemoveBookmark}
        />
      </div>
      <div className="bookmarks-sidebar">
        <h1>Bookmarks</h1>
        <Bookmarks bookmarks={bookmarks} />
      </div>
    </div>
  );
};
