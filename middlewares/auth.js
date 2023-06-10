const { comparePassword } = require("../bcrypt");
const { getAllUsers } = require("../models/users");
const jwt = require("jsonwebtoken");

// For signup
async function checkUsernameAvailabilitiy(req, res, next) {
    const { username } = req.body;
    const usersList = await getAllUsers();
    const usernameTaken = usersList.find((user) => user.username === username);

    if (username.length >= 3) {
        if (!usernameTaken) {
            next();
        } else {
            res.status(409).json({
                success: false,
                usernameTaken: true,
                message: "Username is already taken, try another username!",
            });
        }
    } else {
        res.status(406).json({
            success: false,
            message: "Username not long enough, minimum 3 characters required",
        });
    }
}

// For signup
async function checkPasswordSecurity(req, res, next) {
    const { password } = req.body;

    if (password.length >= 8) {
        next();
    } else {
        res.status(406).json({
            success: false,
            message: "Password not long enough, minimum 8 characters required",
        });
    }
}

// For Login
async function checkUsernameMatch(req, res, next) {
    const { username } = req.body;
    const usersList = await getAllUsers();
    const matchedUser = usersList.find((user) => user.username === username);
    if (matchedUser) {
        next();
    } else {
        res.status(404).json({
            success: false,
            message: "We have nobody with that username registered here.",
        });
    }
}

// For login
async function checkPasswordMatch(req, res, next) {
    const { username, password } = req.body;
    const usersList = await getAllUsers();
    const matchedUser = usersList.find((user) => user.username === username);
    const matchedPw = await comparePassword(password, matchedUser.password); // Bcrypt compare function
    if (matchedPw) {
        next();
    } else {
        res.status(401).json({
            success: false,
            correctPassword: false,
            message: "Incorrect password, try again!",
        });
    }
}

// Checks for correct JWT
function checkToken(req, res, next) {
    const token = req.headers.authorization.replace("Bearer ", "");

    if (token) {
        const data = jwt.verify(token, "a1b1c1");

        res.locals.username = data.username;
        next();
    } else {
        res.status(401).json({
            success: false,
            message: "Invalid token, you do not have permission",
        });
    }
}

// Handles admin permission by getting the user role from JWT payload
function checkAdminPermission(req, res, next) {
    const token = req.headers.authorization.replace("Bearer ", "");
    const data = jwt.verify(token, "a1b1c1");

    if (data.role === "admin") {
        res.locals.role = data.role;
        next();
    } else {
        res.status(401).json({
            success: false,
            message: "You do not have admin permissions",
        });
    }
}

module.exports = {
    checkPasswordMatch,
    checkPasswordSecurity,
    checkUsernameAvailabilitiy,
    checkUsernameMatch,
    checkToken,
    checkAdminPermission,
};
