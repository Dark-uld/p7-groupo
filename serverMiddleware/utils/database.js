const { Sequelize } = require('sequelize');

// Connection to MariaDB
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mariadb",
    port: process.env.DB_PORT,
    dialectOptions: {
        socketPath:process.env.DB_SOCKETPATH || "",
        connectTimeout: 100000,
        skipSetTimezone:true,
    } // mariadb connector option
});


(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;