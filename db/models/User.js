const conn = require('../conn'); 

const User = conn.define('user', {
  name: {
    type: conn.Sequelize.STRING,
    unique: true
  },
  password: conn.Sequelize.STRING,
  token: conn.Sequelize.TEXT,
  isAdmin: {
    type: conn.Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  classMethods: {
    getCartForUser: function(userId){
      const Order = conn.models['order'];
      const LineItem = conn.models['lineItem'];
      const Product = conn.models['product'];
      console.log(LineItem);
      return Order.findOne({
        where: {
          userId: userId,
          state: 'CART',
        },
        include: [ 
          {
            model: LineItem,
            include: [ Product ]
          }
        ]
      })
      .then( cart => {
        if(cart)
          return cart;
        return Order.create({ userId, state: 'CART' }); 
      })
      .then( cart => Order.findById(cart.id, { 
        include: [ 
          {
            model: LineItem,
            include: [ Product ]
          }
        ]
      }));
    }
  },
  instanceMethods: {
    getCart: function(){
      const userId = this.id;
      const Order = conn.models['order'];
      const LineItem = conn.models['lineItem'];
      const Product = conn.models['product'];
      console.log(LineItem);
      return Order.findOne({
        where: {
          userId: this.id,
          state: 'CART',
        },
        include: [ 
          {
            model: LineItem,
            include: [ Product ]
          }
        ]
      })
      .then( cart => {
        if(cart)
          return cart;
        return Order.create({ userId, state: 'CART' }); 
      })
      .then( cart => Order.findById(cart.id, { 
        include: [ 
          {
            model: LineItem,
            include: [ Product ]
          }
        ]
      }));
    }
  }
});

module.exports = User;
