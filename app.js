const express = require("express");
const app = express();
const { uuid } = require("uuidv4");
const { orderStatus } = require("./middlewares/orderStatus");
const { saveToOrders, findOrderByUserId } = require('./models/orders');
const { getAllMenuItems } = require('./models/menu');
const {
  checkUsernameMatch,
  checkPasswordMatch,
  checkUsernameAvailabilitiy,
  checkPasswordSecurity,
} = require("./middlewares/auth");
const { checkProducts } = require("./middlewares/checkProducts");
const { calculateTotalPrice } = require("./middlewares/calculateTotalPrice");
const { createUser } = require("./models/users");

const port = 5000;

app.use(express.json());


// menuDb.insert({"title":"Latte Macchiato","desc":"Bryggd på månadens bönor.","price":49});
// menuDb.insert({"title":"Bryggkaffe","desc":"Bryggd på månadens bönor.","price":39});
// menuDb.insert({"title":"Gustav Adolfsbakelse","desc":"En kunglig bakelse.","price":50});
// menuDb.insert({"title":"Semla","desc":"En fastlagsbulle i sin rätta form.","price":50});
// menuDb.insert({"title":"Kaffe Latte","desc":"Bryggd på månadens bönor.","price":54});
// menuDb.insert({"title":"Cortado","desc":"Bryggd på månadens bönor.","price":39});
// menuDb.insert({"title":"Caffè Doppio","desc":"Bryggd på månadens bönor.","price":49});
// menuDb.insert({"title":"Cappuccino","desc":"Bryggd på månadens bönor.","price":49});

app.get("/api/menu", async (req, res) => {
  try {
    const docs = await getAllMenuItems();
    res.status(200).json({ success: true, data: docs });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Could not fetch from database",
      code: err.code,
    });
  }
});

app.post("/api/order/:id", checkProducts, calculateTotalPrice, async (req, res) => {
  // Middleware för auth skickar med userId och isLoggedIn: true
  // Om inloggad få med userId

  const userId = req.params;
  let products = res.locals.products;
  let orderTime = new Date();
  const order = {
    products: products,
    totalPrice: res.locals.totalPrice,
    orderNr: uuid(),
    orderTime: orderTime,
    deliveryTime: new Date(orderTime.getTime() + 20 * 60000), // 20 minutes from order time
  };

  if (userId) {
    order.userId = userId;
  }
  try {
    if (order) {
      await saveToOrders(order);
    }
    res.json({
      success: true,
      message: "Order placed successfully",
      eta: 20,
      orderNr: order.orderNr,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Could not fetch from database",
      code: err.code,
    });
  }
});

app.post(
  "/api/user/signup",
  checkUsernameAvailabilitiy,
  checkPasswordSecurity,
  async (req, res) => {
    // Middleware för att validera input
    const user = {
      username: req.body.username,
      password: req.body.password,
      userId: uuid(),
    };
    try {
      await createUser(user);
      res.status(201).json({ success: true });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error occurred while creating user",
        code: err.code,
      });
    }
  }
);

app.post(
  "/api/user/login",
  checkUsernameMatch,
  checkPasswordMatch,
  async (req, res) => {
    const { user } = req.body;
    try {
      res.json({ success: true, user: user });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error occurred while logging in user",
        code: err.code,
      });
    }
  }
);

app.get("/api/user/:id/history", async (req, res) => {
  // Funkar inte. Idn som är inlagd på ordern blir ett objekt med key/value. Ska vara direkt ID.
  // Gör denna!!

  const userId = req.params.id;
  try {
    const orders = await findOrderByUserId(userId);
    res.json({ success: true, orderHistory: orders });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occurred while getting order",
      code: err.code,
    });
  }
});

app.get("/api/order/status/:ordernr", orderStatus, async (req, res) => {
  // Middleware som räknar ut hur många min kvar returnerar timeLeft
  try {
    res.json({ success: true, timeLeft: res.locals.timeLeft });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occurred while getting status of order",
      code: err.code,
    });
  }
});

app.listen(port, () => {
  console.log("Server listening on " + port);
});

