const { getAllMenuItems } = require("../models/menu");

async function checkProducts(req, res, next) {
    let matchCount = 0;
    const menu = await getAllMenuItems();
    const orderProducts = req.body.products;

    if (orderProducts !== undefined) {
        // Kollar så det inte är undefined
        orderProducts.forEach((orderProduct) => {
            // Varje order produkt

            menu.forEach((menuItem) => {
                // Varje meny item
                if (orderProduct._id === menuItem._id) {
                    // Matchar det?
                    matchCount++;
                }
            });
        });

        if (matchCount === orderProducts.length) {
            next();
        } else {
            res.json({
                success: false,
                message: "One of your products does not exist in our menu",
            });
        }
    } else {
        res.json({ success: false, message: "No products in your order" });
    }
}

module.exports = { checkProducts };
