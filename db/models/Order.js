const conn = require('../conn'); 

const Order = conn.define('order', {
  state : {
    type: conn.Sequelize.ENUM('CART', 'PLACED', 'PROCESSED'),
    defaultValue: 'CART'
  }
});

module.exports = Order;
