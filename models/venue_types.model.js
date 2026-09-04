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

    VenueTypes.associate = (models) => {
        VenueTypes.belongsTo(models.Venue, {
            foreignKey: 'venueId',
            as: 'venue',
        });
        
        VenueTypes.belongsTo(models.Types, {
            foreignKey: "typeId",
            as: "type",
        });
    };

    return VenueTypes;
};