async function getuser(uid) {
    const rows = await query(`SELECT * FROM user WHERE uid='${uid}' `);
    const data = helper.emptyOrRows(rows);
    return { status: 200, data };
}

async function getAllUser() {
    const rows = await query(`SELECT * FROM user`);
    const data = helper.emptyOrRows(rows);
    return { status: 200, data };
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
