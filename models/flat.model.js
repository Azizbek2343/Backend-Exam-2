const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Flat = sequelize.define('Flat', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        etaj: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        condition: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Flat.associate = (models) => {
        Flat.hasMany(models.CustomerAddress, {
            foreignKey: "flat_id",
            as: "customerAddresses",
        });
    };

    return Flat;
};