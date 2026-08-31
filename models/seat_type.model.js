const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const SeatType = sequelize.define('SeatType', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    });

    return SeatType;
};