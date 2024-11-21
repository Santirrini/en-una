require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
  logging: false,
  native: false,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
});

const basename = path.basename(__filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexión (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Restaurant, User, Menu, Order, SuccessPayment, Code,Form } = sequelize.models;

// Relaciones
User.hasOne(Restaurant, { foreignKey: 'userId' });
Restaurant.belongsTo(User, { foreignKey: 'userId' });

Restaurant.hasMany(Menu, { foreignKey: 'restaurantId' });
Menu.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

Restaurant.hasMany(Order, { foreignKey: 'restaurantId' });
Order.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(SuccessPayment, { foreignKey: 'userId', as: 'successPayments' });
SuccessPayment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Order.hasOne(SuccessPayment, { foreignKey: 'orderId', as: 'successPayment' });
SuccessPayment.belongsTo(Order, { foreignKey: 'orderId', as: 'orders' });






Code.hasMany(User, { foreignKey: 'codeId' });
User.belongsTo(Code, { foreignKey: 'codeId' });

Code.hasMany(Form, { foreignKey: 'codeId', as: 'forms' }); // Un código puede estar asociado a varios formularios
Form.belongsTo(Code, { foreignKey: 'codeId', as: 'code' }); // Un formulario tiene un único código

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importar la conexión { conn } = require('./db.js');
};
