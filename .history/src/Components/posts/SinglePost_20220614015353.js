import React from "react";
import { render } from "react-dom";
import renderHTML from "react-render-html";
import "./posts.css"; // This is the css file for the posts
export default ({
  match: {
    params: { id },
  },
  history,
  posts,
  handleBookmark,
  handleRemoveBookmark,
  handleRemove,
}) => {
  let post = posts.filter((post) => post.id === id);
  post = post[0];


  return (
    <div className="single-post">
      <h1 className="header">{post.title}</h1>
      <div className="single-post__body">
        {post.isVideo ? (
          <video className="image" src={post.path} autoPlay loop controls />
        ) : (
          <img className="image" src={post.path} alt="image" />
        )}
        {renderHTML(post.body)}
      </div>

      <ul className="post-foot">
        <li>
          {post.bookmark ? (
            <button
              className="btn btn-remove-bookmarks"
              onClick={() => handleRemoveBookmark(post)}
            >
              Remove from Bookmark
            </button>
          ) : (
            <button
              className="btn btn-bookmarks"
              onClick={() => handleBookmark(post)}
            >
              Add to Bookmark
            </button>
          )}
        </li>
        <li>
          <button
            className="btn btn-remove"
            onClick={() => handleRemove(post, history)}
          >
            Remove
          </button>
        </li>
      </ul>
    </div>
  );
};
