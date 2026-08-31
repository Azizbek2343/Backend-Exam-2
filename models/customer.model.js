const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Customer = sequelize.define('Customer', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hashed_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birth_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        gender_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        lang_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hashed_refresh_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        tableName: 'customer',
    });

    return Customer;
};