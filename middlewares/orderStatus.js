const { ordersDb } = require('../app');

async function orderStatus(req, res, next) {
    const orderId = req.params.ordernr;
    console.log('order ID', orderId);
    try {
      const order = await ordersDb.findOne({ orderNr: orderId });
      console.log('order------------------------------', order);
      if (order) {
        const currentTime = new Date();
        const timeLeftInMilliseconds = order.deliveryTime - currentTime;
        const timeLeftInMinutes = Math.max(Math.round(timeLeftInMilliseconds / 60000), 0); // 60000 milliseconds in a minute
        
        res.locals.timeLeft = timeLeftInMinutes; // Save the result to res.locals so it can be accessed in the next middleware
        next();
      } else {
        res.status(404).send("Order not found");
      }
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "Error occurred in orderStatus function",
          code: err.code,
        });
    }
  }

module.exports = { orderStatus }