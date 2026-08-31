const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const EventType = sequelize.define('EventType', {
        id: {
            type: DataTypes.SMALLINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        parent_event_type_id: {
            type: DataTypes.SMALLINT,
            allowNull: true,
        },
    });

    return EventType;
};