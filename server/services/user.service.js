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

async function postStatus(uid, newstatus) {
}
