const db = require("../app");

async function priceCheck(req, res, next) {
  const { products } = req.body;

  //Insomnia body
//   [
//     {
//       productName,
//       productId, _id skickas till insomnia
//       price,
//       quantity,
//     },
//   ];

  let totalPrice;
  for (let product of products) {
    const coffee = await db.menu.findOne({ _id: product.productId });

    if (
      coffee.price === product.price &&
      coffee.productId === product.productId
    ) {
      totalPrice += product.price;
    }
  }
  res.locals.totalPrice = totalPrice;
  next();
}

module.exports = { priceCheck }