// models/menu.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Menu = sequelize.define('Menu', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        imageFile: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
        name: {
            type: DataTypes.STRING,
        },
        category: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
        details: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.STRING,
        },

        stock: {
            type: DataTypes.BOOLEAN,
        },
  
        restaurantId: {  // Agrega esta columna para la relación con Restaurant
            type: DataTypes.UUID,
            allowNull: false,
        }
    });

    return Menu;
};
