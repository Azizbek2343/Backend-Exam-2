const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const VenueTypes = sequelize.define('VenueTypes', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        venueId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        typeId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    });

    return VenueTypes;
};