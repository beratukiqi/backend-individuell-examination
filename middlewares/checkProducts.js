const { getAllMenuItems } = require("../models/menu");

async function checkProducts(req, res, next) {
    const menu = await getAllMenuItems();
    const orderProducts = req.body.products;

    if (orderProducts) {
        const allProductsExist = orderProducts.every((product) =>
            menu.find((menuItem) => menuItem._id === product._id)
        );

        if (allProductsExist) {
            next();
        } else {
            res.status(404).json({
                success: false,
                message: "One of your products does not exist in our menu",
            });
        }
    } else {
        res.status(404).json({
            success: false,
            message: "Need a product, recieved none",
        });
    }
}

module.exports = { checkProducts };
