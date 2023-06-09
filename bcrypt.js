const bcrypt = require("bcryptjs");

async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 5);
    return hashedPassword;
}

async function comparePassword(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

module.exports = { hashPassword, comparePassword };
