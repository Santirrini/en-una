const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Transaccion', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    sessionId: {
      type: DataTypes.UUID,
  
    },
    userId: {
      type: DataTypes.UUID,
  
    },
    

      shippingAddress: {
        type: DataTypes.JSON, // Puedes ajustar el tipo de dato según tus necesidades
      },
      // Ot



  },);
};
