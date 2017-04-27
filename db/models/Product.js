const conn = require('../conn'); 

const Product = conn.define('product', {
  name: conn.Sequelize.STRING,
  price: conn.Sequelize.DECIMAL
});

module.exports = Product;
