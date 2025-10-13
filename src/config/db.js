const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'lojaDB',
    port: 3308,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

(async ()=>{
    try {
        const connection = await pool.getConnection();
        console.log('conectado ao MySql');
        connection.release();
    } catch (error) {
        console.error(`Erro ao conectar ao MySQL: ${error}`);
    }
})();

module.exports = pool;