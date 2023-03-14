const User = require("../models/user.model");


const userRegistration = async (
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

const userLogIn = async (
  username
  ) => {
  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};



module.exports = {
  userRegistration,
  userLogIn
};
