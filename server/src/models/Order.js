const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    location: {
      type: DataTypes.STRING,

    },
    date: {
      type: DataTypes.STRING,

    },
    hours: {
      type: DataTypes.STRING,

    },
    peoples: {
      type: DataTypes.STRING,

    },
    order: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
    restaurantId: {
      type: DataTypes.UUID,
    },
    userId: {
      type: DataTypes.UUID,
    }
  });



  return Order;
};
