require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries.js');
const app = express();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const {
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

const port = process.env.PORT;

const routeCall = (req, res, next) => {
    console.log('Route is called');
    next();
}
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

//app.use(express.static('./public')); //access files from folder ./public
// Body parsing
app.use(bodyParser.json());

// Middleware to initialize passport
/*
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (email, done) => {
    const [id, userPassword] = await findUserFromEmail(email);
    done(null, id);
})

passport.use(new LocalStrategy(async (email, password, done) => {
    const [id, userPassword] = await findUserFromEmail(email);
    if (password !== userPassword) return done(null, false);
    return done(null, id);
}))

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/profile', (req, res) => {
    res.render('profile', {user: req.user});
})

app.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), (req, res) => {
    res.redirect('/profile');
})

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})
*/
// POST request for logging in
app.post('/login', async (req, res, next) => {
    const {email, password} = req.body;
    const user = await findUserFromEmail(email);
    if (password === user.password) {
        req.session.authenticated = true;
        req.session.user = {
            username: email,
            password: password
        };
        console.log(req.session);
        res.redirect(`/users/${user.id}`);
    } else {
        res.status(403).json({msg: 'Wrong password.'});
    }
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
    //res.json({info: 'Welcome to this E-commerce API!'});
    res.send('<h1>Welcome to this e-commerce API!</h1>');
})

app.get('/users', getUsers);
app.get('/users/:id', getUserById);
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);
app.get('/carts', getCarts);
app.get('/users/:id/carts', ensureAuthentication, getCartsByUserId);
app.post('/carts', ensureAuthentication, createCart);
app.put('/carts/:id', ensureAuthentication, updateCart);
app.delete('/carts/:id', ensureAuthentication, deleteCart);
app.get('/orders', ensureAuthentication, getOrders);
app.get('/orders/:id', ensureAuthentication, getOrderById);
app.post('/orders', createOrder);
app.put('/orders/:id', ensureAuthentication, updateOrder);
app.delete('/orders/:id', ensureAuthentication, deleteOrder);
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
