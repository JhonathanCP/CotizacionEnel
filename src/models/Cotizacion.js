import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js'
import { Precio } from './Precio.js';

export const Cotizacion = sequelize.define('cotizacion', {
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
    }
});

Cotizacion.belongsToMany(Precio, { through: 'precioCotizacion', foreignKey: 'cotizacionId' });
Precio.belongsToMany(Cotizacion, { through: 'precioCotizacion', foreignKey: 'precioId' });