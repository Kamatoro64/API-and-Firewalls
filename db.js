// Debugging: console.log(require('dotenv').config())
// Load configuration from .env file which is not pushed to github (addded to .gitignore)
require('dotenv').config();
const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

module.exports = pool;
