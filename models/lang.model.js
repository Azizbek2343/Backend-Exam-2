const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Lang = sequelize.define('Lang', {
        id: {
            type: DataTypes.SMALLINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Lang;
};