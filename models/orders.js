const nedb = require("nedb-promise");
ordersDb = new nedb({ filename: "./databases/orders.db", autoload: true });

async function saveToOrders(order) {
    return await ordersDb.insert(order);
}

async function findOrderByUserId(userId) {
    return await ordersDb.find({ userId: userId });
}

module.exports = { saveToOrders, findOrderByUserId }