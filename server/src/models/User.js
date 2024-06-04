const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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
    orderId: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.models.Order, // Aquí cambiamos 'Orders' a 'Order'
        key: 'id',
      },
    },

    successPayment: {
      type: DataTypes.UUID,
      references: {
        model: sequelize.models.SuccessPayment, 
        key: 'id',
      },
    },
  });

  

  return User;
};
