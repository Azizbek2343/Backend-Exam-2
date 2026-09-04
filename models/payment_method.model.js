const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const PaymentMethod = sequelize.define('PaymentMethod', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    PaymentMethod.associate = (models) => {
        PaymentMethod.hasMany(models.Booking, {
            foreignKey: "payment_method_id",
            as: "bookings",
        });
    };

    return PaymentMethod;
};