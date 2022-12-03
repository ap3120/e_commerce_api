const express = require('express');
const router = express.Router();
const query = require('../model/queries.js').query;
const {ensureAuthentication} = require('./util/auth.js');

router.get('/:id', /*ensureAuthentication,*/ (req, res) => {
    const id = parseInt(req.params.id);
    /*if (id !== req.session.passport.user) {
        return res.status(403).json({msg: 'Access denied.'});
    }*/
    query('select * from orders where user_id = $1', [id], (err, results) => {
        if (err) {throw err;}
        res.status(200).json(results.rows);
    })
});

router.get('/orders_products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    query('select * from products join orders_products on products.product_id = orders_products.product_id join orders on orders_products.order_id = orders.order_id where orders.order_id = $1', [id], (err, results) => {
        if (err) {throw err;}
        //console.log(results.rows);
        res.status(200).json(results.rows);
    })
})

router.post('/', /*ensureAuthentication,*/ (req, res) => {
    const {date, total_price, user_id, products} = req.body;
    /*if (user_id !== req.session.passport.user) {
        return res.status(403).json({msg: 'You are not allowed to pass an order for that user.'});
    }*/
    query('insert into orders (date, total_price, user_id) values ($1, $2, $3) returning *', [date, total_price, user_id], (err, results) => {
        if (err) {throw err;}
        const order_id = results.rows[0].order_id;
        for (let i = 0; i < products.length; i++) {
            query('insert into orders_products (order_id, product_id) values ($1, $2) returning *', [order_id, products[i].product_id], (er, resu) => {
                if (er) {throw er};
            })
        }
        res.status(201).json({msg: `Order successfully created.`});

    })
});

exports.router = router;
