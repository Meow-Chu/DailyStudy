import PostModel from "../Models/postModel.js";
import UserModel from "../Models/userModel.js";
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

// like & unlike a post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post unliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Timeline Posts
export const getTimeLinePosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const currentUserPosts = await PostModel.find({ userId: userId });
    const followingPosts = await UserModel.aggregate([
      //(3)
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId), //(4)
        },
      },
      {
        $lookup: {
          //(5)
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          //(6)
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res
      .status(200)
      .json(currentUserPosts.concat(...followingPosts[0].followingPosts)); //(7)
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
 * (3) 몽고DB의 aggregate메서드는 데이터를 집계하고 처리할 때 흔히 쓰인다. SQL의 GROUP BY와 JOIN과 유사한 작업을 수행하는데 주로 여러 문서를 그룹화하고 필터링하거나 데이터를 변환하고 계산하는데 사용됨. aggregate메서드는 일련의 단계를 지정하는 파이프라인으로 구성되어있으며 각 단계는 $match, $group, $project, $sort 등과 같은 다양한 MongoDB 집계 연산자로 구성되어있다.
 * (4) _id:userId 로 값을 match할 수 없다. 그 이유는 database를 보면 _id의 값을 보면 바로 id가 나오는게 아니라 ObjectId가 감싸고 있다. 올바르게 match하려면 curly brace(중괄호)로 감싼 후 new mongoose.Types.OjectId라고 작성해야함
 * (5) $lookup은 MongoDB의 aggregation frameworkd에서 제공하는 연산자 중 하나이다. 다른 컬렉션에서 데이터를 가져와 현재 컬렉션의 문서와 조인할 수 있게 해준다. 옵션의 의미 ① from : 데이터를 가져 올 컬렉션명, ② localField : 현재 컬렉션(aggregate를 호출한 컬렉션)에서 데이터를 가져올 필드명, ③ foreignField : localField와 조인할 컬렉션 필드로 from컬렉션에서 참조할 필드명 ④ as : 결과를 저장할 새로운 필드명. 
 * 이 코드에서는 'posts'컬렉션에서 데이터를 가져오고, posts컬렉션의 필드 중 following필드를 기준으로 (현재 사용자가 팔로우하는 사용자들의 ID가 following필드에 저장되어있기 때문) 데이터를 가져온다. 팔로우하는 사용자의ID가 userId필드에 저장되어있으므로 posts컬렉션에서는 userId의 필드를 참조할 것이다. 결국, URL에서 추출한 userId와 userId가 팔로우하는 userId의 포스트들은 followingPosts라는 새로운 필드에 조인된 결과가 저장된다.
 * (6) $project: aggregation pipeline에서 결과를 가공하는 데 사용되는 연산자로 결과를 가공하여 특정 필드를 포함하거나 제외할 수 있다.  1은 "포함"을 의미하고, 0은 "제외"를 의미하는데 이 코드에서는 followingPosts 필드는 결과에 포함시키고, _Id는 포함시키지 않는다. 
 * (7) res.status(200).json(currentUserPosts.concat(followingPosts)); 이 코드조각을 사용해서 Get통신을 했을 때의 응답은 아래와 같았다. 
 * [
  {
    "_id": "65c733eeac93f6cc7e6f7f22",
    "userId": "65c731a8ac93f6cc7e6f7f07",
    "desc": "I am 1 here",
    "likes": [],
    "createdAt": "2024-02-10T08:29:34.166Z",
    "updatedAt": "2024-02-10T08:29:34.166Z",
    "__v": 0
  },   
  URL로 추출한 userId의 post는 배열에 정보가 담겨있다
  userId가 팔로우하는 포스트들은 followingPosts라는 이름으로 배열에 정보가 담겨있다. 
  이는 매우 복잡한 포맷이므로 간단하게 바꿔보겠다
  {
    "followingPosts": [
      {
        "_id": "65c733f4ac93f6cc7e6f7f24",
        "userId": "65c73227ac93f6cc7e6f7f10",
        "desc": "I am 2 here",
        "likes": [],
        "createdAt": "2024-02-10T08:29:40.629Z",
        "updatedAt": "2024-02-10T08:29:40.629Z",
        "__v": 0
      },   
      {
        "_id": "65c733fbac93f6cc7e6f7f26",
        "userId": "65c7322cac93f6cc7e6f7f12",
        "desc": "I am 3 here",
        "likes": [],
        "createdAt": "2024-02-10T08:29:47.461Z",
        "updatedAt": "2024-02-10T08:29:47.461Z",
        "__v": 0
      }
    ]
  }
]

① followingPosts라는 이름의 배열을 모두 spread 한다 :  res
      .status(200)
      .json(currentUserPosts.concat(...followingPosts))
res ▶ 이전과 동일
② 첫번째 속성만 추출한다 : res
      .status(200)
      .json(currentUserPosts.concat(...followingPosts[0]))
res ▶ {}
③ 0번째 인덱스의 followingPosts필드만 추출한다 :    res
      .status(200)
      .json(currentUserPosts.concat(...followingPosts[0].followingPosts));

      res ▶ userId의 포스트와 userId가 following하는 포스트를 응답받을 수 있음
      [
  {
    "_id": "65c733eeac93f6cc7e6f7f22",
    "userId": "65c731a8ac93f6cc7e6f7f07",
    "desc": "I am 1 here",
    "likes": [],
    "createdAt": "2024-02-10T08:29:34.166Z",
    "updatedAt": "2024-02-10T08:29:34.166Z",
    "__v": 0
  },
  {
    "_id": "65c733f4ac93f6cc7e6f7f24",
    "userId": "65c73227ac93f6cc7e6f7f10",
    "desc": "I am 2 here",
    "likes": [],
    "createdAt": "2024-02-10T08:29:40.629Z",
    "updatedAt": "2024-02-10T08:29:40.629Z",
    "__v": 0
  },
  {
    "_id": "65c733fbac93f6cc7e6f7f26",
    "userId": "65c7322cac93f6cc7e6f7f12",
    "desc": "I am 3 here",
    "likes": [],
    "createdAt": "2024-02-10T08:29:47.461Z",
    "updatedAt": "2024-02-10T08:29:47.461Z",
    "__v": 0
  }
]

 */
