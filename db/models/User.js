const conn = require('../conn'); 

const User = conn.define('user', {
  name: {
    type: conn.Sequelize.STRING,
    unique: true
  },
  password: conn.Sequelize.STRING
}, {
  instanceMethods: {
    getCart: function(){
      const userId = this.id;
      const Order = conn.models['order'];
      return Order.findOne({
        where: {
          userId: this.id,
          state: 'CART'
        }
      })
      .then( cart => {
        if(cart)
          return cart;
        return Order.create({ userId, state: 'CART' }); 
      });
    }
  }
});

module.exports = User;
