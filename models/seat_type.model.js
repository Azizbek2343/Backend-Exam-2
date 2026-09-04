const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const SeatType = sequelize.define('SeatType', {
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

    SeatType.associate = (models) => {
        SeatType.hasMany(models.Seat, {
            foreignKey: 'seat_type_id',
            as: 'seats',
        });

    };

    return SeatType;
};