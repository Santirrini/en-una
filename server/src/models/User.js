const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    
    name: {
      type: DataTypes.STRING,
    },

    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },

    phone: {
      type: DataTypes.STRING
    },


    backgroundColor: {
      type: DataTypes.STRING
    },

    
    role: {
      type: DataTypes.STRING
    },

    restaurantId: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.models.Restaurant,
        key: 'id'
      }
    },
    
    
    
  },);
  return User;
};
