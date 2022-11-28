const express = require('express');
const router = express.Router();
const query = require('../model/queries.js').query;
const bcrypt = require('bcrypt');

const checkIfUserExists = (email) => {
    return new Promise((resolve, reject) => {
        query('select * from users where email = $1', [email], (err, results) => {
            if (err) {reject(err);}
            if (results.rows.length === 0) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}


router.post('/register', async (req, res) => {
    const {first_name, last_name, email, password} = req.body;
    const userExist = await checkIfUserExists(email);
    if (userExist === true) {
        console.log('User already exist.');
        return res.json({msg: `User ${email} already exist.`});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    query('insert into users (first_name, last_name, email, password) values ($1, $2, $3, $4) returning *', [first_name, last_name, email, hashedPassword], (err, results) => {
        if (err) {throw err;}
        console.log(results.rows[0]);
        res.status(201).json(results.rows[0]);
    })
})

router.get('/register', (req, res) => {
    res.redirect('/register');
})

router.post('/login', (req, res) => {
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

router.get('/login', (req, res) => {
    res.redirect('/login');
})

router.get('/users', (req, res) => {
    query('select * from users order by id asc', (err, results) => {
        if (err) {throw err}
        res.status(200).json(results.rows);
    })
})

router.put('/users/:id', async (req, res) => {
    const {first_name, last_name, email, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); 
    const id = parseInt(req.params.id);
    query('update users set first_name = $1, last_name = $2, email = $3, password = $4 where id = $5', [first_name, last_name, email, hashedPassword, id], (err, results) => {
        if (err) {throw err;}
        res.status(200).send(`User updated with id: ${id}`);
    })
})

router.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('delete from users where id = $1', [id], (err, results) => {
        if (err) {throw err;}
        res.status(200).send(`User removed with id: ${id}`);
    })
})

exports.router = router;
