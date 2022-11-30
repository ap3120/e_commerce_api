const express = require('express');
const router = express.Router();
const query = require('../model/queries.js').query;

router.get('/:category', (req, res) => {
    const category = req.params.category;
    query('select * from products where category = $1', [category], (err, results) => {
        if (err) {throw err;}
        res.status(200).json(results.rows);
    })
});

exports.router = router;
