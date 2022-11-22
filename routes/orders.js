const express = require('express');
const router = express.Router();
const query = require('../model/queries.js').query;

router.get('/', (req, res) => {
    query('select * from orders order by order_id asc', (err, results) => {
        if (err) {throw err;}
        res.status(200).json(results.rows);
    })
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    query('select * from orders where order_id = $1', [id], (err, results) => {
        if (err) {throw err;}
        res.status(200).json(results.rows);
    })
});

router.post('/', (req, res) => {
    const {date, total_price, user_id, cart_id} = req.body;
    query('insert into orders (date, total_price, user_id, cart_id) values ($1, $2, $3, $4) returning *', [date, total_price, user_id, cart_id], (err, results) => {
        if (err) {throw err;}
        res.status(201).send(`Order created with id: ${results.rows[0].order_id}`);
    })
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {date, total_price, user_id, cart_id} = req.body;
    query('update orders set date = $1, total_price = $2, user_id = $3, cart_id = $4 where order_id = $5', [date, total_price, user_id, cart_id, id], (err, results) => {
        if (err) {throw err;}
        res.status(200).send(`User updated with id: ${id}`);
    })
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    query('delete from orders where order_id = $1', [id], (err, results) => {
        if (err) {throw err;}
        res.status(200).send(`Order removed with id: ${id}`);
    })
});

exports.router = router;
