const users = require("../databases/user");
const userRepository = require("../repositories/user.repository");

class UserService {
  constructor() {}

  getUser = (req, res) => {
    /*const rows = await query(`SELECT * FROM user WHERE uid='${uid}' `);
    const data = helper.emptyOrRows(rows);
    //return { status: 200, data };*/

    //return users.singleData;

    return userRepository.getUser(req);
  };

  getAllUser = (req, res) => {
    /* const rows = await query(`SELECT * FROM user`);
    const data = helper.emptyOrRows(rows);
    //return { status: 200, data };*/

    /*fs.readFile('../databases/user.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    //return;
  }
  // parse the JSON data
  const userData = JSON.parse(data);*/

    //return users.allData;

    return userRepository.getAllUser(req);
  };

  createUser = (req, res) => {
    //return users.newUser;
    return userRepository.createUser(req);

  };

  updateUser = (req, res) => {
    /*const rows = await query(`UPDATE user SET  uid='${uid}' `);
    const data = helper.emptyOrRows(rows);
    //return { status: 200, data };*/
    //return users.updateUser;
    return userRepository.updateUser(req);

  };

  deleteUser = (req, res) => {
    /*const rows = await query(`DELETE FROM user WHERE uid='${uid}' `);
    const data = helper.emptyOrRows(rows);
    //return { status: 200, data };*/
    //return users.deleteUser;
    return userRepository.deleteUser(req);

  };
}

module.exports = new UserService();
