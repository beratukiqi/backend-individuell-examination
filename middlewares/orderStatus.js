const { db } = require('../app');

async function orderStatus(req, res, next) {
  const orderId = req.params.orderid;
  try {
    const order = await db.orders.findOne({ orderId }); 
    if (order) {
        const timeLeft = order.orderTime - new Date(); 
    }
  } catch (err) {
    
  }
    
}

module.exports = { orderStatus }