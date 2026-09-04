const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Booking = sequelize.define('Booking', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        cart_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        fineshed: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        payment_method_id: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        delivery_method_id: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        discount_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        status_id: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
    }, {
        tableName: 'booking',
    });

    Booking.associate = (models) => {
        Booking.belongsTo(models.Cart, {
            foreignKey: "cart_id",
            as: "cart",
        });

        Booking.belongsTo(models.PaymentMethod, {
            foreignKey: "payment_method_id",
            as: "paymentMethod",
        });

        Booking.belongsTo(models.DeliveryMethod, {
            foreignKey: "delivery_method_id",
            as: "deliveryMethod",
        });

        Booking.belongsTo(models.Discount, {
            foreignKey: "discount_id",
            as: "discount",
        });

        Booking.belongsTo(models.TicketStatus, {
            foreignKey: "status_id",
            as: "status",
        });
    };

    return Booking;
};