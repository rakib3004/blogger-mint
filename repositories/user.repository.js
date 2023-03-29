const User = require("../models/user.model");

const getAllUsers = async (pageOffset,pageLimit) => {
  try {

    const users = await User.findAll(
      {
        offset:pageOffset,
        limit: pageLimit,
         order: [['createdAt', 'DESC']]
      }
    );
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createUser = async (
  id,
  username,
  email,
  password,
  createdAt,
  updatedAt
) => {
  try {
    const user = await User.create({
      id: id,
      username: username,
      email: email,
      password: password,
      createdAt: createdAt,
      updatedAt: updatedAt,
    });
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
  return user;
   
  } catch (error) {
    throw error;
  }
};

const updateUserPasswordByUsername = async (username, newPassword) => {
  try {
    
    const user = await User.update(
      { password: newPassword },
      { where: { username: username } }
    );
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
    } 
      return null;
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserByUsername,
  updateUserPasswordByUsername,
  deleteUserByUsername,
};
