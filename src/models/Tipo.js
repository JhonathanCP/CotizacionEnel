import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js'
import { Precio } from './Precio.js';

export const Tipo = sequelize.define('tipo', {
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

Tipo.hasMany(Precio, {
    foreignKey: 'tipoId',
    sourceKey: 'id'
});

Precio.belongsTo(Tipo, {
    foreignKey: 'tipoId',
    sourceKey: 'id'
});
