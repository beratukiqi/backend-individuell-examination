const { getAllMenuItems } = require("../models/menu");

async function checkProducts(req, res, next) {
    let isFaild = false;
    const menu = await getAllMenuItems();
    const orderProducts = req.body.products;
  
    if (orderProducts !== undefined) {
      orderProducts.forEach((orderProduct) => {
        menu.forEach((menuItem) => {
          if (orderProduct.productId === menuItem._id) {
            isFaild = true;
          }
        });
      });
      if (!isFaild) {
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

  module.exports = { checkProducts }