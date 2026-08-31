const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Ticket = sequelize.define('Ticket', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        event_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        seat_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        service_fee: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        status_id: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        ticket_type_id: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
    }, {
        tableName: 'ticket',
    });

    return Ticket;
};