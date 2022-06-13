import React from "react";

import Post from "./Post";

export default ({ posts, handleBookmark, handleRemoveBookmark }) => {
  console.log(URL.createObjectURL(posts.data)))
  const showPost = posts.map((post) => (
    <Post
      key={post.id}
      post={post}
      handleBookmark={handleBookmark}
      handleRemoveBookmark={handleRemoveBookmark}
    />
  ));

  return <div>{showPost}</div>;
};
