// const nedb = require("nedb-promise");
const { menuDb } = require("../app");

async function priceCheck(req, res, next) {
  const products = req.body;
  console.log('prod', products);

  //Insomnia body
//   [
//     {
//       productName,
//       productId, _id från menu skickas till insomnia
//       price,
//       quantity,
//     },
//   ];

  let totalPrice;
  for (let product of products) {
    const coffee = await menuDb.findOne({ _id: product.productId });

    if (
      coffee.price === product.price &&
      coffee.productId === product.productId
    ) {
      totalPrice += product.price;
      console.log('In loop', totalPrice);
    }
  }
  console.log('Total', totalPrice);
  res.locals.totalPrice = totalPrice;
  next();
}

module.exports = { priceCheck }