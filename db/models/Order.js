const conn = require('../conn'); 

const Order = conn.define('order', {
  state : {
    type: conn.Sequelize.ENUM('CART', 'ORDER', 'SHIPPED'),
    defaultValue: 'CART'
  }
});

module.exports = Order;
