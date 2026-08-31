const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Venue = sequelize.define('Venue', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        site: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        schema: {
            type: DataTypes.GEOMETRY,
            allowNull: true,
        },
        region_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        district_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });

    return Venue;
};