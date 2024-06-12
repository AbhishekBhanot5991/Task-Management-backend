const {Pool} = require('pg');
require('dotenv').config();
console.log("Database Configuration:");
console.log("connection string:", process.env.POSTGRES_URL);
console.log("User:", process.env.DB_USER);
console.log("Host:", process.env.DB_HOST);
console.log("Database:", process.env.DB_NAME);
console.log("Password:", process.env.DB_PASSWORD ? '****' : 'Not Set');
console.log("Port:", process.env.DB_PORT);

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    secret:process.env.JWT_SECRET,

    // user:process.env.DB_USER,
    // host:process.env.DB_HOST,
    // database: process.env.DB_NAME,
    // password: process.env.DB_PASSWORD,
    // port:process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: true // If using self-signed certificates
      }
})

module.exports = pool;