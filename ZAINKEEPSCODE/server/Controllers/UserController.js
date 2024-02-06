import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";

// get a User
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);

    if (user) {
      // (1)
      const { password, ...otherDetails } = user._doc;

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such user exists");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// update a user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus, password } = req.body;

  if (id === currentUserId || currentUserAdminStatus) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only update your own profile");
  }
};

//Delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus } = req.body;
  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only delete your own profile");
  }
};

// Follow a User
export const followUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdminStatus } = req.body;
  if (currentUserId === id) {
    res.status(403).json("Action forbidden"); //(3)
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);

      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed");
      } else {
        res.status(403).json("User is already followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

/* (1) 
기존코드로 Get요청을 통해 user정보를 응답받았을 때의 문제는 passowrd 정보도 같이 넘어왔다는 것이다. 우리는 관리자 외의 사람들이 password정보를 공유하는 걸 원치 않을 것이다. res받기 전에 아래코드를 추가하고
 const { password, ...otherDetails } = user._doc; 
 -> body에서부터 password와 다른 필드의 값을 받아서 user._doc이란 변수에 담음. 
 res.status(200).json(user); 를 res.status(200).json(otehrDetails); 로 변수를 바꿈
 -> password값을 제외한 다른 필드의 값만 res로 받으면 관리자 외의 사람들은 애초에 GET 요청을 통해 user 정보를 받았을 때 password값은 빠져있으므로 보안이 올라감. 
 
 (2)
 findById, findByIdAndUpdate, findByIdAndDelete :  MongoDB의 Mongoose 라이브러리에 내장된 함수로 MongoDB를 조작하기 위해 사용됨
 findById: 주어진 ID로 문서를 찾습니다.
 findByIdAndUpdate: 주어진 ID로 문서를 찾아 업데이트합니다.
 findByIdAndDelete: 주어진 ID로 문서를 찾아 삭제합니다.
 
 (3)
 본인 스스로를 follow할 수 없도록
 */
