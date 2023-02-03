// initialiser sequelize (grâce aux infos de connexion contenues dans le .env)
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    define: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

module.exports = sequelize;