const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Carousel = sequelize.define('Carousel', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    imageCarousel: {
      type: DataTypes.STRING,

    },
   
      
  }, {
    timestamps: false, // Desactiva los campos createdAt y updatedAt
  });



  return Carousel;
};
