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

    Cart.associate = (models) => {
        Cart.hasMany(models.CartItem, {
            foreignKey: "cart_id",
            as: "cart_items",
        });

        Cart.belongsTo(models.Customer, {
            foreignKey: "customer_id",
            as: "customer",
        });

        Cart.belongsTo(models.TicketStatus, {
            foreignKey: "status_id",
            as: "status",
        });

        Cart.hasMany(models.Booking, {
            foreignKey: "cart_id",
            as: "bookings",
        });
    };

    return Cart;
};