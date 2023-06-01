const { findMenuItemById } = require('../models/menu');

async function calculateTotalPrice(req, res, next) {
    const products = req.body.products;
    console.log("Products", products);
    //Insomnia body
    //   [
    //     {
    //       productName,
    //       productId, _id från menu skickas till insomnia
    //       price,
    //       quantity,
    //     },
    //   ];
  
    let totalPrice = 0;
  
    for (let product of products) {
      const coffee = await findMenuItemById(product.productId);
  
      for (let c of coffee) {
        if (c.price === product.price && c._id === product.productId) {
          let quantitySum = product.quantity * product.price;
          totalPrice += quantitySum;
        }
      }
    }
    console.log("TotalPrice", totalPrice);
    res.locals.totalPrice = totalPrice;
    res.locals.products = products;
    next();
  }

  module.exports = { calculateTotalPrice }