const express = require('express');
const router = express.Router();
const db = require('./queries.js');
const bcrypt = require('bcrypt');

const checkIfUserExists = (email) => {
    return new Promise((resolve, reject) => {
        db.query('select * from users where email = $1', [email], (err, results) => {
            if (err) {reject(err);}
            if (results.rows.length === 0) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

module.exports = (app) => {
    app.use('/', router);
    router.post('/register', async (req, res) => {
        const {first_name, last_name, email, password} = req.body;
        const userExist = await checkIfUserExists(email);
        if (userExist === true) {
            console.log('User already exists.');
            return res.redirect('/login');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        db.query('insert into users (first_name, last_name, email, password) values ($1, $2, $3, $4) returning *', [first_name, last_name, email, hashedPassword], (err, results) => {
            if (err) {throw err;}
            res.status(201).send(`User added with id: ${results.rows[0].id}`);
        })
    })

    router.get('/login', (req, res) => {
        res.json({msg: 'login'});
    })

}
