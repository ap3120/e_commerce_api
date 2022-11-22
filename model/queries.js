require('dotenv').config();
const bcrypt = require('bcrypt');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'ec',
    host: 'localhost',
    database: 'e_commerce_api',
    password: process.env.DB_PASSWORD,
    port: 5432,
})

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
}
