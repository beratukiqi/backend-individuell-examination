const { findMenuItemById } = require("../models/menu");

async function validateMenuById(req, res, next) {
    const id = req.body.id;
    const menuItem = await findMenuItemById(id);

    if (menuItem) {
        next();
    } else {
        res.json({
            success: false,
            message: "Your product ID does not exist in our menu",
        });
    }
}

module.exports = { validateMenuById };
