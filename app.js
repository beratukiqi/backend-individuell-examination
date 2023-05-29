const express = require('express');
const app = express();
const nedb = require('nedb-promise');
const db = {}
db.menu = new nedb({ filename: './databases/menu.db', autoload: true });
db.users = new nedb({ filename: './databases/users.db', autoload: true });
db.orders = new nedb({ filename: './databases/orders.db', autoload: true });

const port = 5000;

app.use(express.json());


app.get('/api/menu', (req, res) => {

});

app.post('/api/order', (req, res) => {

});

app.post('/api/user/signup', (req, res) => {

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