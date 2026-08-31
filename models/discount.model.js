const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Discount = sequelize.define('Discount', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        discount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        finish_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    });

    return Discount;
};