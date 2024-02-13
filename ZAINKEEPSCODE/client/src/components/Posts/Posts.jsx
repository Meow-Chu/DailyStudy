import React from "react";
import { PostsData } from "../../Data/PostsData";

import "./Posts.css";
import Post from "../Post/Post";

function Posts() {
  return (
    <div className="Posts">
      {PostsData.map((post, id) => {
        return <Post data={post} id={id} />;
      })}
    </div>
  );
}

export default Posts;
