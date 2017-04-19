const conn = require('../conn'); 

const Category = conn.define('category', {
  name: conn.Sequelize.STRING
});

module.exports = Category;
