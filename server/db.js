const { Sequelize } = require('sequelize')

module.exports = new Sequelize(
    "postgres://admin:4MunylnkdRiqEYPzzXR1BzqUB56ySO84@dpg-cpbdi4tds78s73et65og-a.oregon-postgres.render.com/pcshopdb?ssl=true",
    {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {}, //removed ssl
      }
    // process.env.DB_NAME,
    // process.env.DB_USER,
    // process.env.DB_PASSWORD,
    //     {
    //         dialect: 'postgres',
    //         host: process.env.DB_HOST,
    //         port: process.env.DB_PORT
    //     }

    )