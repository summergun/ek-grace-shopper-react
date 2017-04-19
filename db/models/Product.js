const conn = require('../conn'); 

const Product = conn.define('product', {
  name: conn.Sequelize.STRING
});

module.exports = Product;
