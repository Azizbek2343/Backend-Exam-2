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

    VenuePhoto.associate = (models) => {
        VenuePhoto.belongsTo(models.Venue, {
            foreignKey: 'venueId',
            as: 'venue',
        });
    };

    return VenuePhoto;
};