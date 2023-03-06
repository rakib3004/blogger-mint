const users = require("../databases/user");
const userRepository = require("../repositories/user.repository");

class UserService {
  constructor() {}

  getUser = (req, res) => {
  
    username = req.params;
    if (username == null) {
      res.send({ status: 402, message: "null user" });
      return;
    }

    return userRepository.getUser(username);
  };

  getAllUser = (req, res) => {

    return userRepository.getAllUser(req);
  };

  createUser = (req, res) => {

    const Username = username;
    const Email = req.body.Email;
    const Password = req.body.Password;
    const CreatedAt = req.body.CreatedAt;
    const UpdatedAt = Date.now();

    const updatedUserData = [Username,Email,Password,CreatedAt,UpdatedAt];

    return userRepository.createUser(updatedUserData);

  };

  updateUser = (req, res) => {
    username = req.params;
    if (username == null) {
      res.send({ status: 402, message: "null user" });
      return;
    }

    const Username = username;
    const Email = req.body.Email;
    const Password = req.body.Password;
    const CreatedAt = req.body.CreatedAt;
    const UpdatedAt = Date.now();

    const updatedUserData = [Username,Email,Password,CreatedAt,UpdatedAt]
    return userRepository.updateUser(updatedUserData);

  };

  deleteUser = (req, res) => {
    username = req.params;
    if (username == null) {
      res.send({ status: 402, message: "null user" });
      return;
    }

    return userRepository.deleteUser(username);

  };
}

module.exports = new UserService();
