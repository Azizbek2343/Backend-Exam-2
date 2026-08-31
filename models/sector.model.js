const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Sector = sequelize.define('Sector', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        sector_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Sector;
};