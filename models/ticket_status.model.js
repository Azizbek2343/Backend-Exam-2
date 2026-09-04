const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const TicketStatus = sequelize.define('TicketStatus', {
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

    TicketStatus.associate = (models) => {
        TicketStatus.hasMany(models.Ticket, {
            foreignKey: 'status_id',
            as: 'tickets',
        });

        TicketStatus.hasMany(models.Cart, {
            foreignKey: 'status_id',
            as: 'carts',
        });

        TicketStatus.hasMany(models.Booking, {
            foreignKey: 'status_id',
            as: 'bookings',
        });
    };

    return TicketStatus;
};