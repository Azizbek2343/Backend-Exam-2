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
        tableName: 'Tycket_Type',
    });

    return TicketType;
};