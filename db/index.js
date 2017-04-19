const conn = require('./conn'); 
const Product = require('./models/Product');


const sync = ()=> conn.sync({ force: true });

const seed = ()=> {
  const products = ['foo', 'bar', 'bazz'];

  return sync()
    .then(()=> {
      const promises = products.map(name => Product.create({ name }));
      return Promise.all(promises);
    });
};

module.exports = {
  models: {
    Product
  },
  sync,
  seed
};
