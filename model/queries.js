require('dotenv').config();

const Pool = require('pg').Pool;
// Local development configuration
const devConf = {
    user: 'ec',
    host: 'localhost',
    database: 'e_commerce_api',
    password: process.env.DB_PASSWORD,
    port: 5432,
}
// Production configuration
const prodConf = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
}

const pool = new Pool(process.env.NODE_ENV === 'production' ? prodConf : devConf);

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
}
