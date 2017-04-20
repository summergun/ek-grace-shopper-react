const conn = require('../conn'); 

const LineItem = conn.define('lineItem', {
  quantity: {
    type: conn.Sequelize.INTEGER,
    unique: true
  }
});

module.exports = LineItem;
