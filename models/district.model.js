const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const District = sequelize.define('District', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        region_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    });

    District.associate = (models) => {
        District.hasMany(models.Venue, {
            foreignKey: 'district_id',
            as: 'venues',
        });

        District.hasMany(models.CustomerAddress, {
            foreignKey: "district_id",
            as: "customerAddresses",
        });

        District.belongsTo(models.Region, {
            foreignKey: 'region_id',
            as: 'region',
        });
    };

    return District;
};