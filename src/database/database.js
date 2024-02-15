import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('enel', 'postgres', 'zxcvqwer159A-', {
    host: 'localhost',
    dialect: 'postgres',
//    dialectOptions: {
//       ssl: true
//      }
})
