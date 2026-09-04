const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Region = sequelize.define('Region', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Region.associate = (models) => {
        Region.hasMany(models.Venue, {
            foreignKey: "region_id",
            as: "Venues",
        });

        Region.hasMany(models.CustomerAddress, {
            foreignKey: "region_id",
            as: "customerAddresses",
        });

        Region.hasMany(models.District, {
            foreignKey: "region_id",
            as: "districts",
        });
    };

    return Region;
};