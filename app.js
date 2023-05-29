const express = require('express');
const app = express();
const nedb = require('nedb-promise');
const db = {}
db.menu = new nedb({ filename: './databases/menu.db', autoload: true });
db.users = new nedb({ filename: './databases/users.db', autoload: true });
db.orders = new nedb({ filename: './databases/orders.db', autoload: true });

const port = 5000;

app.use(express.json());


app.get('/api/menu', async (req, res) => {
    try {
        const docs = await db.menu.find({});
        res.status(200).json({ success: true, data: docs });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Could not fetch from database', code: err.code });
    }
});

app.post('/api/order', (req, res) => {

});

app.post('/api/user/signup', async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    try {
        const newUser = await db.users.insert(user);
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error occurred while creating user', code: err.code });
    }

});

app.post('/api/user/login', (req, res) => {

});

app.get('/api/orderhistory/:id', (req, res) =>{

});

app.get('/api/order/status/:orderid', (req, res) => {

});

app.listen(port, () => {
     console.log('Server listening on ' + port);
});