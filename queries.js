require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'ec',
    host: 'localhost',
    database: 'e_commerce_api',
    password: process.env.DB_PASSWORD,
    port: 5432,
})

const getPasswordFromEmail = (email) => {
    return new Promise((resolve, reject) => {
        pool.query('select * from users where email = $1', [email], (err, results) => {
            if (err) {throw err;}
            if (results.rows.length === 0) {reject(new Error('An error occured.'))}
            else {
                const user = results.rows[0].email;
                if (!user){
                    reject(new Error('User not found'));
                } else {
                    resolve([
                        results.rows[0].id,
                        results.rows[0].password
                    ]);
                }
            }
        });
    });
}

const findUserFromEmail = async (email) => {
    return await getPasswordFromEmail(email);
}

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

const createUser = (req, res) => {
    const {first_name, last_name, email} = req.body;
    pool.query('insert into users (first_name, last_name, email) values ($1, $2, $3) returning *', [first_name, last_name, email], (err, results) => {
        if (err) {throw err;}
        res.status(201).send(`User added with id: ${results.rows[0].id}`);
    })
}

const updateUser = (req, res) => {
    const {first_name, last_name, email} = req.body;
    const id = parseInt(req.params.id);
    pool.query('update users set first_name = $1, last_name = $2, email = $3 where id = $4', [first_name, last_name, email, id], (err, results) => {
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
    findUserFromEmail,
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
}
