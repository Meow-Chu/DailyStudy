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

// Get a post
export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// (2) Update a post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a Post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post Deleted successfully");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * (1) const newPost = req.body로 시작하는 것보다 new PostModel함수를 사용하는 이유는.. req의 body를 받자마자 그것을 우리의 post에 삽입하게 된다. 그런 후 newPost에 우리의 post model의 객체를 담게 된다. new PostModel이라는 2 단어를 추가함으로써 추가로 작성할 코드량을 줄여줄 수 있음
 * (2) Update a Post
 * 'req' : 클라이언트의 요청정보가 담겨있는 객체. 여기서는 요청URL의 parameter와 body데이터를 사용한다.
 * 'res' : 서버가 클라이언트로 응답할 때 사용되는 객체로 객체 속의 params.id값을 추출하여 postId에 담고, body의 값을 userId에 담는다.
 * userId의 destructuring : {userId} 라고 쓴 이유는 postModel.js에서 req.body에 들어갈 속성들을 정해놓았다. req.body객체에서 userId속성의 값을 추출하여 userId변수에 할당하고 있는 것이기 때문이다. 또 다른 궁금증은 왜 cont {userId} = req.body.userId가 아닐까...? 인데 자바스크립트에서는 객체의 특정 속성만 추출하여 변수로 할당할 수 있는데 req.body객체에서 userId속성의 값이 이미 담겨있으므로 굳이 코드를 길게 써서 추출할 필요가 없다고 이해해본다....
 */
