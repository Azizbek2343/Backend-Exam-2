const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Seat = sequelize.define('Seat', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        sector_id: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        row_number: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        number: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        venue_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        seat_type_id: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        location_in_schema: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    Seat.associate = (models) => {
        Seat.belongsTo(models.SeatType, {
            foreignKey: 'seat_type_id',
            as: 'seatType',
        });

        Seat.belongsTo(models.Sector, {
            foreignKey: 'sector_id',
            as: 'sector',
        });

        Seat.belongsTo(models.Venue, {
            foreignKey: 'venue_id',
            as: 'venue',
        });

        Seat.hasMany(models.Ticket, {
            foreignKey: 'seat_id',
            as: 'tickets',
        });
    };



    return Seat;
};