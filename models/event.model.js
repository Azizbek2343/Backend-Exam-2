const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Event = sequelize.define('Event', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        finish_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        finish_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        info: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        event_type_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        human_category_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        venue_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        lang_id: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        release_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
    });

    return Event;
};