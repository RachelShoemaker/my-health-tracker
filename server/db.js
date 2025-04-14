const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "HelloWorld",
    database: "health_data",
    port: 5432
});

module.exports = pool;