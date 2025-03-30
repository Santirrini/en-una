const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    area: {
      type: DataTypes.STRING,

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
    observation: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    restaurantId: {
      type: DataTypes.UUID,
    },
    userId: {
      type: DataTypes.UUID,
    }
  }, {
    timestamps: false, // Desactiva los campos createdAt y updatedAt
  });



  return Order;
};
