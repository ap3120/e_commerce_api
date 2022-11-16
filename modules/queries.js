require('dotenv').config();
const bcrypt = require('bcrypt');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'ec',
    host: 'localhost',
    database: 'e_commerce_api',
    password: process.env.DB_PASSWORD,
    port: 5432,
})

const getUsers = (req, res) => {
    pool.query('select * from users order by id asc', (err, results) => {
        if (err) {throw err;}
        res.status(200).json(results.rows);
    })
}

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('select * from users where id = $1', [id], (err, results) => {
        if (err) {throw err;}
        res.status(200).json(results.rows);
    })
}

const updateUser = async (req, res) => {
    const {first_name, last_name, email, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); 
    const id = parseInt(req.params.id);
    pool.query('update users set first_name = $1, last_name = $2, email = $3, password = $4 where id = $5', [first_name, last_name, email, hashedPassword, id], (err, results) => {
        if (err) {throw err;}
        res.status(200).send(`User updated with id: ${id}`);
    })
}

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('delete from users where id = $1', [id], (err, results) => {
        if (err) {throw err;}
        res.status(200).send(`User removed with id: ${id}`);
    })
}

const getCarts = (req, res) => {
    pool.query('select * from carts order by cart_id asc', (err, results) => {
        if (err) {throw err;}
        res.status(200).json(results.rows);
    })
}

const getCartsByUserId = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('select * from carts where user_id = $1 order by cart_id asc', [id], (err, results) => {
        if (err) {throw err;}
        res.status(200).json(results.rows);
    })
}

const createCart = (req, res) => {
    const {total_price, user_id} = req.body;
    pool.query('insert into carts (total_price, user_id) values ($1, $2) returning *', [total_price, user_id], (err, results) => {
        if (err) {throw err;}
        res.status(201).send(`Cart created with id: ${results.rows[0].cart_id}`);
    })
}

const updateCart = (req, res) => {
    const id = parseInt(req.params.id);
    const {total_price, user_id} = req.body;
    pool.query('update carts set total_price = $1, user_id = $2 where cart_id = $3', [total_price, user_id, id], (err, results) => {
        if (err) {throw err;}
        res.status(200).send(`Cart updated with id: ${id}`);
    })
}

const deleteCart = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('delete from carts where cart_id = $1', [id], (err, results) => {
        if (err) {throw err;}
        res.status(200).send(`Cart removed with id: ${id}`);
    })
}

const getOrders = (req, res) => {
    pool.query('select * from orders order by order_id asc', (err, results) => {
        if (err) {throw err;}
        res.status(200).json(results.rows);
    })
}

const getOrderById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('select * from orders where order_id = $1', [id], (err, results) => {
        if (err) {throw err;}
        res.status(200).json(results.rows);
    })
}

const createOrder = (req, res) => {
    const {date, total_price, user_id, cart_id} = req.body;
    pool.query('insert into orders (date, total_price, user_id, cart_id) values ($1, $2, $3, $4) returning *', [date, total_price, user_id, cart_id], (err, results) => {
        if (err) {throw err;}
        res.status(201).send(`Order created with id: ${results.rows[0].order_id}`);
    })
}

const updateOrder = (req, res) => {
    const id = parseInt(req.params.id);
    const {date, total_price, user_id, cart_id} = req.body;
    pool.query('update orders set date = $1, total_price = $2, user_id = $3, cart_id = $4 where order_id = $5', [date, total_price, user_id, cart_id, id], (err, results) => {
        if (err) {throw err;}
        res.status(200).send(`User updated with id: ${id}`);
    })
}

const deleteOrder = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('delete from orders where order_id = $1', [id], (err, results) => {
        if (err) {throw err;}
        res.status(200).send(`Order removed with id: ${id}`);
    })
}

const getProducts = (req, res) => {
    pool.query('select * from products order by product_id asc', (err, results) => {
        if (err) {throw err;}
        res.status(200).json(results.rows);
    })
}

const getProductById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('select * from products where product_id = $1', [id], (err, results) => {
        if (err) {throw err;}
        res.status(200).json(results.rows);
    })
}

const createProduct = (req, res) => {
    const {name, category, price, description} = req.body;
    pool.query('insert into products (name, category, price, description) values ($1, $2, $3, $4) returning *', [name, category, price, description], (err, results) => {
        if (err) {throw err;}
        res.status(201).send(`Product added with id: ${results.rows[0].product_id}`);
    })
}

const updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const {name, category, price, description} = req.body;
    pool.query('update products set name = $1, category = $2, price = $3, description = $4 where product_id = $5', [name, category, price, description, id], (err, results) => {
        if (err) {throw err;}
        res.status(200).send(`Product updated with id: ${id}`);
    })
}

const deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('delete from products where product_id = $1', [id], (err, results) => {
        if (err) {throw err;}
        res.status(200).send(`Product removed with id: ${id}`);
    })
}

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getCarts,
    getCartsByUserId,
    createCart,
    updateCart,
    deleteCart,
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
