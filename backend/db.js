const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'player_data',
    password: 'Harrychrisjust3',
    port: 5432,
});

module.exports = pool;