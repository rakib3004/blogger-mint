const fs = require('fs');

async function getuser(uid) {
    const rows = await query(`SELECT * FROM user WHERE uid='${uid}' `);
    const data = helper.emptyOrRows(rows);
    return { status: 200, data };
}

async function getAllUser() {
   /* const rows = await query(`SELECT * FROM user`);
    const data = helper.emptyOrRows(rows);
    return { status: 200, data };*/


  const userData=  [
      {
          "Id" : 1, 
          "Username": "turja",
          "Email": "simanta.deb@cefalo.com",
          "Password": "123456",
          "CreatedAt": "12-12-12",
          "UpdatedAt": "12-12-12"
      
      },
      
      {
          "Id" : 2, 
          "Username": "rakib",
          "Email": "rakib.trofder@cefalo.com",
          "Password": "cefalo123",
          "CreatedAt": "12-12-12",
          "UpdatedAt": "12-12-12"
      
      },
    ]      

/*fs.readFile('../databases/user.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  // parse the JSON data
  const userData = JSON.parse(data);*/

  return userData;

}

async function creatUser() {
}

async function updateUser(uid) {
    const rows = await query(`UPDATE user SET  uid='${uid}' `);
    const data = helper.emptyOrRows(rows);
    return { status: 200, data };
}

async function deleteUser(uid) {
    const rows = await query(`DELETE FROM user WHERE uid='${uid}' `);
    const data = helper.emptyOrRows(rows);
    return { status: 200, data };
}
