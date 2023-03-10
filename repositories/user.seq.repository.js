const User = require("../models/user.seq.model");


const getAllUser = async () => {
    try {
      const users = await User.findAll();
      return users;
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
    return user;
  } catch (error) {
    console.error(error);
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
