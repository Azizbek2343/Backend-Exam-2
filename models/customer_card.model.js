const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const CustomerCard = sequelize.define('CustomerCard', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        customer_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.CHAR,
            allowNull: false,
        },
        month: {
            type: DataTypes.CHAR,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        is_main: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, {
        tableName: 'customer_card',
    });

    return CustomerCard;
};