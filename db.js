// Debugging: console.log(require('dotenv').config())
// Load configuration from .env file which is not pushed to github (addded to .gitignore)
//require('dotenv').config();
if(process.env.APP_ENV === "prod") { 
    //console.log(`APP_ENV set to ${process.env.APP_ENV}`)
    require('custom-env').env('prod')
    //console.log(`Database settings: ${process.env.DATABASE} on ${process.env.DB_HOST}:${process.env.DB_PORT}`)
}
else if (process.env.APP_ENV === "test") { 
    //console.log(`APP_ENV set to ${process.env.APP_ENV}`)
    require('custom-env').env('test')
    //console.log(`Database settings: ${process.env.DATABASE} on ${process.env.DB_HOST}:${process.env.DB_PORT}`)
} else {
    //console.log(`APP_ENV is not specified. Current value set to ${process.env.APP_ENV}`)
}

const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

module.exports = pool;
