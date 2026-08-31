const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Admin = sequelize.define('Admin', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hashed_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        is_creator: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        hashed_refresh_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: 'admin',
    });

    return Admin;
};