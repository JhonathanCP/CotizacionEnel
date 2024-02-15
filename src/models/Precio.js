import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js'


export const Precio = sequelize.define('precio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING
    },
    monto: {
        type: DataTypes.FLOAT,
    }
});