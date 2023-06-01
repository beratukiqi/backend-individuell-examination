const { findMenuItemById } = require("../models/menu");
//Insomnia body
//   [
//     {
//       productName,
//       productId, _id från menu skickas till insomnia
//       price,
//       quantity,
//     },
//   ];

async function calculateTotalPrice(req, res, next) {
    const products = req.body.products;
    console.log("Products", products);

    let totalPrice = 0;

    for (let product of products) {
        const targetCoffee = await findMenuItemById(product._id);
        console.log("Target coffee ----------------------- ", targetCoffee);

        let quantitySum = product.quantity * targetCoffee[0].price;
        console.log(product.quantity, "PRODUCT QUAN");
        console.log(targetCoffee[0].price, "TARGET COFFEE");
        totalPrice += quantitySum;
    }
    console.log("TotalPrice in Middleware", totalPrice);
    res.locals.totalPrice = totalPrice;
    res.locals.products = products;
    next();
}

module.exports = { calculateTotalPrice };
