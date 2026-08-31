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

    return Booking;
};