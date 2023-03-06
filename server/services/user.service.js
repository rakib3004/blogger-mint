const users = require('../databases/user');



async function getuser(uid) {
    /*const rows = await query(`SELECT * FROM user WHERE uid='${uid}' `);
    const data = helper.emptyOrRows(rows);
    return { status: 200, data };*/

    return users.singleData;
}

async function getAllUser() {
   /* const rows = await query(`SELECT * FROM user`);
    const data = helper.emptyOrRows(rows);
    return { status: 200, data };*/



/*fs.readFile('../databases/user.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  // parse the JSON data
  const userData = JSON.parse(data);*/

  return users.allData;

}

async function creatUser() {
  return users.newUser;

}

async function updateUser(uid) {
    /*const rows = await query(`UPDATE user SET  uid='${uid}' `);
    const data = helper.emptyOrRows(rows);
    return { status: 200, data };*/
    return users.updateUser;

}

async function deleteUser(/*uid*/) {
    /*const rows = await query(`DELETE FROM user WHERE uid='${uid}' `);
    const data = helper.emptyOrRows(rows);
    return { status: 200, data };*/
    return users.deleteUser;

}
