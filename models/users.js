const nedb = require("nedb-promise");
usersDb = new nedb({ filename: "./databases/users.db", autoload: true });

async function getAllUsers() {
    return await usersDb.find({});
}

module.exports = { getAllUsers }