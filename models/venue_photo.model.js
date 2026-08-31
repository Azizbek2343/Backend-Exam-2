const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const VenuePhoto = sequelize.define('VenuePhoto', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        venueId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return VenuePhoto;
};