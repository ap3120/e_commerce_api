const express = require('express');
const router = express.Router();
const query = require('../model/queries.js').query;

router.get('/', (req, res) => {
    query('select * from carts order by cart_id asc', (err, results) => {
        if (err) {throw err;}
        res.status(200).json(results.rows);
    })
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    query('select * from carts where user_id = $1 order by cart_id asc', [id], (err, results) => {
        if (err) {throw err;}
        res.status(200).json(results.rows);
    })
})

router.post('/', (req, res) => {
    const {total_price, user_id} = req.body;
    query('insert into carts (total_price, user_id) values ($1, $2) returning *', [total_price, user_id], (err, results) => {
        if (err) {throw err;}
        res.status(201).send(`Cart created with id: ${results.rows[0].cart_id}`);
    })
})

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {total_price, user_id} = req.body;
    query('update carts set total_price = $1, user_id = $2 where cart_id = $3', [total_price, user_id, id], (err, results) => {
        if (err) {throw err;}
        res.status(200).send(`Cart updated with id: ${id}`);
    })
})

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    query('delete from carts where cart_id = $1', [id], (err, results) => {
        if (err) {throw err;}
        res.status(200).send(`Cart removed with id: ${id}`);
    })
})

exports.router = router;
