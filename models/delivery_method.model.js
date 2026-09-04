const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const DeliveryMethod = sequelize.define('DeliveryMethod', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    DeliveryMethod.associate = (models) => {
        DeliveryMethod.hasMany(models.Booking, {
            foreignKey: "delivery_method_id",
            as: "bookings",
        });
    };

    return DeliveryMethod;
};