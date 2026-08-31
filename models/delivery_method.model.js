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

    return DeliveryMethod;
};