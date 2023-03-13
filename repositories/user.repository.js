const User = require("../models/user.model");
const UserDTO = require("../DTO/user.dto");
const SingleUserDTO = require("../DTO/user.single.dto");



const getAllUser = async () => {
    try {
      const users = await User.findAll();

      const dtoUsers = new UserDTO(users);
      return dtoUsers;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

const createUser = async (id, username, email, password, createdAt, updatedAt) => {


  try {
    const user = await User.create({id: id, username: username, email: email, password: password, createdAt: createdAt, updatedAt: updatedAt});
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    if (user) {
      const dtoUser = new SingleUserDTO(user);
      return dtoUser;
    } else {
      return null;
    }
   
  } catch (error) {
    throw error;
  }
};

const updateUserPasswordByUsername = async (username, newPassword) => {
  try {
   
    const user = await User.update({password:newPassword},{where:{username:username}});
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteUserByUsername = async (username) => {
  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    if (user) {
      await user.destroy();
      return true;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
 

  getAllUser,
  createUser,
  getUserByUsername,
  updateUserPasswordByUsername,
  deleteUserByUsername
};
