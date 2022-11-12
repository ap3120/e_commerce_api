require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries.js');
const app = express();
const session = require('express-session');

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getCarts,
    getCartsByUserId,
    createCart,
    updateCart,
    deleteCart,
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = db;

const port = process.env.PORT;

const routeCall = (req, res, next) => {
    console.log('Route is called');
    next();
}

//app.use(express.static('./public')); //access files from folder ./public
// Body parsing
app.use(bodyParser.json());

// Routes
app.get('/', (req, res, next) => {
    //res.json({info: 'Welcome to this E-commerce API!'});
    res.send('<h1>Welcome to this e-commerce API!</h1>');
})

app.get('/users', getUsers);
app.get('/users/:id', getUserById);
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);
app.get('/carts', getCarts);
app.get('/users/:id/carts', getCartsByUserId);
app.post('/carts', createCart);
app.put('/carts/:id', updateCart);
app.delete('/carts/:id', deleteCart);
app.get('/products', getProducts);
app.get('/products/:id', getProductById);
app.post('/products', createProduct);
app.put('/products/:id', updateProduct);
app.delete('/products/:id', deleteProduct);

// Error handler
app.use((err, req, res, next) => {
    if (!err.status){
        err.status = 500;
    }
    res.status(err.status).send(err.message);
});

app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
})
