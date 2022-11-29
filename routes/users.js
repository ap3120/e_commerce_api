const express = require('express');
const router = express.Router();
const query = require('../model/queries.js').query;
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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

router.use(passport.initialize());
router.use(passport.session());

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
    query('select * from users where email = $1', [username], async (err, results) => {
        if (err) return done(err);
        const user = results.rows[0];
        if (! user) return done(null, false);
        const matchedPassword = await bcrypt.compare(password, user.password);
        if (! matchedPassword) return done(null, false);
        return done(null, user);
    })
}))

router.post('/login', passport.authenticate('local', {failWithError: true}), (req, res) => {
    if (req.session) {
        console.log(req.session);
        res.json({user: req.user, session: req.session});
    }
}, (err, req, res, next) => {
    res.json({msg: 'Invalid credentials.'});
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
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
