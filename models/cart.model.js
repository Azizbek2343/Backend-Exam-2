const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Cart = sequelize.define('Cart', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        customer_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        fineshedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status_id: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
    }, {
        tableName: 'cart',
    });

    return Cart;
};