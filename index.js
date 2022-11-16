require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./modules/queries.js');
const app = express();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const register = require('./modules/register.js');
const {
    query,
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
} = db;
const bcrypt = require('bcrypt');

const port = process.env.PORT;

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

// Middleware to initialize passport
/*
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    query('select * from users where id = $1', [id], (err, results) => {
        if (err) return done(err);
    });
    done(null, user);
})

passport.use(new LocalStrategy((username, password, done) => {
    console.log('new LocalStrategy called');
    query('select * from users where email = $1', [username], (err, results) => {
        if (err) return done(err);
        const user = results.rows[0];
        console.log(user);
        if (password !== user.password) return done(null, false);
    })
    return done(null, user);
}))

console.log(passport.authenticate);

app.get('/login', (req, res) => {
    res.json({msg: 'login'});
})

app.get('/profile', (req, res) => {
    res.json({msg: `user: ${req.user}`});
})

app.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), (req, res) => {
    console.log('called');
    res.redirect('/profile');
})

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})
*/

register(app);

// POST request for logging in

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    query('select * from users where email = $1', [email], async (err, results) => {
        if (err) {throw err;}
        if (results.rows.length === 0) {
            console.log('User not found');
            res.redirect('/login');
        }
        const user = results.rows[0];
        const matchedPassword = await bcrypt.compare(password, user.password);
        if (matchedPassword) {
            req.session.authenticated = true;
            req.session.user = {
                username: email,
                password: password
            };
            console.log(req.session);
            res.redirect(`/users/${user.id}`);
        } else {
            res.status(403).json({msg: 'Wrong password'});
        }
    })
})

const ensureAuthentication = (req, res, next) => {
    console.log(req.session.authenticated);
    if (req.session.authenticated) {
        return next();
    } else {
        res.status(403).json({msg: 'Please login to view this page.'});
    }
}

// Routes
app.get('/', (req, res, next) => {
    res.send('<h1>Welcome to this E-commerce API!</h1>');
})

app.get('/users', getUsers);
app.get('/users/:id', getUserById);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);
app.get('/carts', ensureAuthentication, getCarts);
app.get('/users/:id/carts', ensureAuthentication, getCartsByUserId);
app.post('/carts', ensureAuthentication, createCart);
app.put('/carts/:id', ensureAuthentication, updateCart);
app.delete('/carts/:id', ensureAuthentication, deleteCart);
app.get('/orders', ensureAuthentication, getOrders);
app.get('/orders/:id', ensureAuthentication, getOrderById);
app.post('/orders', ensureAuthentication, createOrder);
app.put('/orders/:id', ensureAuthentication, updateOrder);
app.delete('/orders/:id', ensureAuthentication, deleteOrder);
app.get('/products', getProducts);
app.get('/products/:id', getProductById);
app.post('/products', createProduct);
app.put('/products/:id', updateProduct);
app.delete('/products/:id', deleteProduct);


app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
})
