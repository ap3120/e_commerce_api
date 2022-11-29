require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
//const db = require('./model/queries.js');
const app = express();
const session = require('express-session');
const usersRouter = require('./routes/users.js').router;
const cartsRouter = require('./routes/carts.js').router;
const ordersRouter = require('./routes/orders.js').router;
const productsRouter = require('./routes/products.js').router;
//const bcrypt = require('bcrypt');
const cors = require('cors');
app.use(cors());
app.use(express.json());

/*app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
next();
});
*/

const port = process.env.PORT;
// Getting information from forms
app.use(express.urlencoded({extended: false}))
// Session middleware
const store = new session.MemoryStore();
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000*60*60*24,
        secure: false,
        sameSite: 'none'
    },
    resave: false,
    saveUninitialized: false,
    store
}));

// Body parsing
app.use(bodyParser.json());


app.use('/', usersRouter);
app.use('/carts', cartsRouter);
app.use('/orders', ordersRouter);
app.use('/products', productsRouter);

app.get('/', (req, res) => {
    res.json({msg: 'running'});
})


const ensureAuthentication = (req, res, next) => {
    console.log(req.session.authenticated);
    if (req.session.passport) {
        return next();
    } else {
        res.status(403).json({msg: 'Please login to view this page.'});
    }
}

app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
})
