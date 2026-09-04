const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const HumanCategory = sequelize.define('HumanCategory', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start_age: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        finish_age: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        gender_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    HumanCategory.associate = (models) => {
        HumanCategory.belongsTo(models.Gender, {
            foreignKey: "gender_id",
            as: "gender",
        });

        HumanCategory.hasMany(models.Event, {
            foreignKey: "human_category_id",
            as: "events",
        });
    };

    return HumanCategory;
};