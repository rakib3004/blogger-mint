const User = require("../models/user.model");
const UserDTO = require("../DTO/user.dto");
const SingleUserDTO = require("../DTO/user.single.dto");



const getAllUser = async () => {
    try {
      const users = await User.findAll();
      console.log(users);

      const dtoUsers = new UserDTO(users);
      return dtoUsers;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.error(error);
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

const updateUserByUsername = async (username, newPassword) => {
  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    if (user) {
      await user.update({
        password: newPassword,
      });
      return user;
    } else {
      throw new Error("User not found");
    }
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
  updateUserByUsername,
  deleteUserByUsername
};
