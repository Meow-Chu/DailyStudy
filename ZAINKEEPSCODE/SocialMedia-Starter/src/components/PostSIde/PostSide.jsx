import React from "react";
import PostShare from "../PostShare/PostShare";

import "./PostSide.css";
import Posts from "../Posts/Posts";

function PostSide() {
  return (
    <div className="PostSide">
      <PostShare />
      <Posts />
    </div>
  );
}

export default PostSide;
