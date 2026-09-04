const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Gender = sequelize.define('Gender', {
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

    Gender.associate = (models) => {
        Gender.hasMany(models.HumanCategory, {
            foreignKey: 'gender_id',
            as: 'humanCategories',
        });

        Gender.hasMany(models.Customer, {
            foreignKey: 'gender_id',
            as: 'customer',
        });
    };

    return Gender;
};