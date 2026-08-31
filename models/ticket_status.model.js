const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const TicketStatus = sequelize.define('TicketStatus', {
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

    return TicketStatus;
};