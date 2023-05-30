const express = require("express");
const app = express();
const nedb = require("nedb-promise");
const { uuid } = require("uuidv4");
const { orderStatus } = require('./middlewares/orderStatus');
const db = {};
db.menu = new nedb({ filename: "./databases/menu.db", autoload: true });
db.users = new nedb({ filename: "./databases/users.db", autoload: true });
db.orders = new nedb({ filename: "./databases/orders.db", autoload: true });

const port = 5000;

app.use(express.json());

app.get("/api/menu", async (req, res) => {
  try {
    const docs = await db.menu.find({});
    res.status(200).json({ success: true, data: docs });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Could not fetch from database",
        code: err.code,
      });
  }
});

app.post("/api/order", async (req, res) => {
  // Middleware för auth
  //Om inloggad få med userId
  
  const { productName, price, quantity, userId } = req.body;
  const order = {
    productName: productName,
    price: price,
    quantity: quantity,
    orderNr: uuid(),
    orderTime: new Date(),
    deliveryTime: new Date(this.orderTime.getTime() + 20*60000) // 20 minutes from order time
  };

  if (userId) {
    order.userId = userId;
  }
  try {
    await db.orders.insert(order);
    res.json({
      success: true,
      message: "Order placed successfully",
      eta: 20,
      orderNr: order.orderNr,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Could not fetch from database",
        code: err.code,
      });
  }
});

app.post("/api/user/signup", async (req, res) => {
  // Middleware för att validera input
  const user = {
    username: req.body.username,
    password: req.body.password,
    userId: uuid(),
  };
  try {
    const newUser = await db.users.insert(user);
    res.status(200).json({ success: true });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error occurred while creating user",
        code: err.code,
      });
  }
});

app.post("/api/user/login", async (req, res) => {
  // Middleware för auth return userId
  const { username, password, user } = req.body;
  try {
    // Vad skickar man med när anv skickas in? Behöver man try efter middleware som gör validering?
    res.json({ success: true, user: user });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error occurred while logging in user",
        code: err.code,
      });
  }
});

app.get("/api/user/:id/history", async (req, res) => {
  const userId = req.params.id;
  try {
    const orders = await db.orders.find({ userId });
    res.json({ success: true, orderHistory: orders });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error occurred while getting order",
        code: err.code,
      });
  }
});

app.get("/api/order/status/:orderid", orderStatus, async (req, res) => {
  // Middleware som räknar ut hur många min kvar returnerar timeLeft
  try {
    res.json({ success: true, timeLeft: res.locals.timeLeft });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error occurred while getting status of order",
        code: err.code,
      });
  }
});

app.listen(port, () => {
  console.log("Server listening on " + port);
});


module.exports = { db }