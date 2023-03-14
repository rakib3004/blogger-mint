const bcrypt = require("bcrypt");

exports.comparePassword = async (inputPassword,userPassword) => {
    const comparePasswordResult = await bcrypt.compare(inputPassword,userPassword);
    return comparePasswordResult;
  };

  