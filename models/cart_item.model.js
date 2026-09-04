const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const CartItem = sequelize.define('CartItem', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        ticket_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        cart_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    }, {
        tableName: 'cart_item',
    });

    CartItem.associate = (models) => {
        CartItem.belongsTo(models.Ticket, {
            foreignKey: "ticket_id",
            as: "ticket",
        });

        CartItem.belongsTo(models.Cart, {
            foreignKey: "cart_id",
            as: "cart",
        });
    };

    return CartItem;
};