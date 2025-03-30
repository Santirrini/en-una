const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Code = sequelize.define('Code', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING,
            unique: true,
          },
        },{
            timestamps: false, // Desactiva los campos createdAt y updatedAt
          } );
    return Code
};
