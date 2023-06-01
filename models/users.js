const nedb = require("nedb-promise");
usersDb = new nedb({ filename: "./databases/users.db", autoload: true });

async function getAllUsers() {
    return await usersDb.find({});
}

async function createUser(user) {
    return await usersDb.insert(user);
}

module.exports = { getAllUsers, createUser }