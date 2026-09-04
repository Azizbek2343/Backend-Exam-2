const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const TicketType = sequelize.define('TicketType', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        ticket_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'ticket_type',
    });

    TicketType.associate = (models) => {
        TicketType.hasMany(models.Ticket, {
            foreignKey: "ticket_type_id",
            as: "tickets",
        });
    };

    return TicketType;
};