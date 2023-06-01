const { findUserById } = require("../models/users");

async function validateUserId(req, res, next) {
    const userId = req.params.userId;
    const user = await findUserById(userId);

    if (user) {
        next();
    } else {
        res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
}

module.exports = { validateUserId };
