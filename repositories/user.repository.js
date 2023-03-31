const {User} = require("../models");
const { SequelizeValidationError } = require("../utils/error.handler.util");


const getAllUsers = async (offset, limit) => {


  const users = await User.findAll(
    {
      offset,
      limit,
      order: [['createdAt', 'DESC']]
    }
  );
  return users;

};

const createUser = async (id, username, email, password, createdAt, updatedAt) => {
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
    throw new SequelizeValidationError(error, 400);
  }
};

const getUserByUsername = async (username) => {
  const user = await User.findOne({
    where: {
      username: username,
    },
  });
  return user;

};

const updateUserPasswordByUsername = async (password,
  updatedAt,
  username) => {

  const user = await User.update(
    { password: password, updatedAt: updatedAt },
    { where: { username: username } }
  );
  return user;

};

const deleteUserByUsername = async (username) => {
  const result = await User.destroy({
    where: {
      username: username,
    },
  });
  return result;

};

module.exports = {
  getAllUsers,
  createUser,
  getUserByUsername,
  updateUserPasswordByUsername,
  deleteUserByUsername,
};
