const User = require("../models/user.seq.model");

const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const findUserByUsername = async (username) => {
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

const updateUserPassword = async (username, newPassword) => {
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
  createUser,
  findUserByUsername,
  updateUserPassword,
  deleteUserByUsername,
};
