import PostModel from "../Models/postModel.js";
import mongoose from "mongoose";

// Creat new Post
export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body); //(1)

  try {
    await newPost.save();
    res.status(200).json("Post created!");
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * (1) const newPost = req.body로 시작하는 것보다 new PostModel함수를 사용하는 이유는.. req의 body를 받자마자 그것을 우리의 post에 삽입하게 된다. 그런 후 newPost에 우리의 post model의 객체를 담게 된다. new PostModel이라는 2 단어를 추가함으로써 추가로 작성할 코드량을 줄여줄 수 있음
 *
 */
