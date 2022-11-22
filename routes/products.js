const express = require('express');
const router = express.Router();
const query = require('../model/queries.js').query;

router.get('/', (req, res) => {
    query('select * from products order by product_id asc', (err, results) => {
        if (err) {throw err;}
        res.status(200).json(results.rows);
    })
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    query('select * from products where product_id = $1', [id], (err, results) => {
        if (err) {throw err;}
        res.status(200).json(results.rows);
    })
});

router.post('/', (req, res) => {
    const {name, category, price, description} = req.body;
    query('insert into products (name, category, price, description) values ($1, $2, $3, $4) returning *', [name, category, price, description], (err, results) => {
        if (err) {throw err;}
        res.status(201).send(`Product added with id: ${results.rows[0].product_id}`);
    })
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {name, category, price, description} = req.body;
    query('update products set name = $1, category = $2, price = $3, description = $4 where product_id = $5', [name, category, price, description, id], (err, results) => {
        if (err) {throw err;}
        res.status(200).send(`Product updated with id: ${id}`);
    })
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    query('delete from products where product_id = $1', [id], (err, results) => {
        if (err) {throw err;}
        res.status(200).send(`Product removed with id: ${id}`);
    })
});

exports.router = router;
