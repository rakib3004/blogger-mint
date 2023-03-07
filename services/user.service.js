const userRepository = require("../repositories/user.repository");



exports.getUser = (req, res) => {
  
  const username = req.params;
    if (username == null) {
      return { status: 402, message: "Invalid User" };

    }

    return userRepository.getUser(username);

  };

  exports.getAllUser = (req, res) => {

    return userRepository.getAllUser(req);
  };

  exports.createUser = (req, res) => {

    const Username = req.body.Username;
    const Email = req.body.Email;
    const Password = req.body.Password;
    const CreatedAt = req.body.CreatedAt;
    const UpdatedAt = req.body.UpdatedAt;

    const updatedUserData = [Username,Email,Password,CreatedAt,UpdatedAt];
    return userRepository.createUser(updatedUserData);

  };

  exports.updateUser = (req, res) => {
    const username = req.params;
    if (username == "") {
      return { status: 402, message: "Invalid User" };

    }

    const Username = req.body.Username;
    const Email = req.body.Email;
    const Password = req.body.Password;
    const CreatedAt = req.body.CreatedAt;
    const UpdatedAt = req.body.UpdatedAt;


    const updatedUserData = [Username,Email,Password,CreatedAt,UpdatedAt];
    return userRepository.updateUser(updatedUserData,username);

  };

  exports.deleteUser = (req, res) => {
    const username = req.params;
    if (username == "") {
      
      return { status: 402, message: "Invalid User" };
    }

    return userRepository.deleteUser(username);

  };


