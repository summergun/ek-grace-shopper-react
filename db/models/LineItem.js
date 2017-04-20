const conn = require('../conn'); 

const LineItem = conn.define('line_item', {
  quantity: {
    type: conn.Sequelize.INTEGER,
    unique: true
  }
});

module.exports = LineItem;
