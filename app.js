const express = require("express");
const app = express();
const { uuid } = require("uuidv4");
const { orderStatus } = require("./middlewares/orderStatus");
const { saveToOrders, findOrdersByUserId } = require("./models/orders");
const { getAllMenuItems } = require("./models/menu");
const {
    checkUsernameMatch,
    checkPasswordMatch,
    checkUsernameAvailabilitiy,
    checkPasswordSecurity,
} = require("./middlewares/auth");
const { checkProducts } = require("./middlewares/checkProducts");
const { calculateTotalPrice } = require("./middlewares/calculateTotalPrice");
const { createUser, findUserById } = require("./models/users");
const { validateUserId } = require("./middlewares/validateUserId");

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

app.post(
    "/api/order/:userId",
    checkProducts,
    calculateTotalPrice,
    async (req, res) => {
        // Middleware för auth skickar med userId och isLoggedIn: true
        // Om inloggad få med userId

        const userId = req.params.userId;
        let products = res.locals.products;
        let orderTime = new Date();

        const order = {
            orderNr: uuid(),
            orderTime: orderTime,
            deliveryTime: new Date(orderTime.getTime() + 20 * 60000), // 20 minutes from order time
            totalPrice: res.locals.totalPrice,
            products: products, // VI VILL SKICKA ANNAT HÄR
        };

        //

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
    }
);

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

app.get("/api/user/:userId/history", validateUserId, async (req, res) => {
    const userId = req.params.userId;
    const user = await findUserById(userId);

    try {
        if (user) {
            const orders = await findOrdersByUserId(userId);
            res.json({ success: true, orderHistory: orders });
        } else {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
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
    // När det är 0 - Delivered: true,

    // c442d76e-fbf9-40e5-8e70-b2286e7d0126    8 min kvar - 17:10
    let isDelivered = false;
    if (res.locals.timeLeft <= 0) {
        isDelivered = true;
    }
    try {
        res.json({ success: true, timeLeft: res.locals.timeLeft, isDelivered });
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
