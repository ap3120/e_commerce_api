const express = require('express');
const router = express.Router();
const query = require('../model/queries.js').query;
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {ensureAuthentication, ensureNotAuthentication} = require('./util/auth.js');

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


router.post('/register', ensureNotAuthentication, async (req, res) => {
    const {first_name, last_name, email, password} = req.body;
    const userExist = await checkIfUserExists(email);
    if (userExist === true) {
        return res.json({msg: `User ${email} already exist.`});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    query('insert into users (first_name, last_name, email, password) values ($1, $2, $3, $4) returning *', [first_name, last_name, email, hashedPassword], (err, results) => {
        if (err) {throw err;}
        res.status(201).json(results.rows[0]);
    })
})

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    query('select * from users where id = $1', [id], (err, results) => {
        if (err) return done(err);
        done(null, results.rows[0]);
    });
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

router.post('/login', ensureNotAuthentication, passport.authenticate('local', {failWithError: true}), (req, res) => {
    if (req.session) {
        res.json({user: req.user, session: req.session});
    }
}, (err, req, res, next) => {
    res.json({msg: 'Invalid credentials.'});
})

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.json({msg: 'Successfully logged out.'});
    });
})

router.get('/users', ensureAuthentication, (req, res) => {
    query('select * from users order by id asc', (err, results) => {
        if (err) {throw err}
        res.status(200).json(results.rows);
    })
})

const getPassword = (id) => {
    return new Promise ((resolve, reject) => {
        query('select * from users where id = $1', [id], (err, results) => {
            if (err) {reject(err);}
            if (results.rows[0].length === 0) {reject(false)}
            resolve(results.rows[0].password);
        })
    })
}

router.put('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const {password, newPassword} = req.body;
    const pw = await getPassword(id);
    const matchedPassword = await bcrypt.compare(password, pw);
    if (matchedPassword) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt); 
        query('update users set password = $1 where id = $2', [hashedPassword, id], (err, results) => {
            if (err) {throw err;}
            return res.status(200).json({msg: 'Password successfully updated.'});
        })
    } else {
        res.status(403).json({msg: 'Incorrect password'});
    }
})

router.delete('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const {password} = req.body;
    const pw = await getPassword(id);
    const matchedPassword = await bcrypt.compare(password, pw);
    if (matchedPassword) {
        query('delete from users where id = $1', [id], (err, results) => {
            if (err) {throw err;}
            return res.status(200).json({msg: 'User successfully deleted.'});
        })
    } else {
        res.status(403).json({msg: 'Incorrect password.'})
    }
})

exports.router = router;
