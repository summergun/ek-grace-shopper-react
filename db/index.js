const conn = require('./conn'); 
const Product = require('./models/Product');
const Category = require('./models/Category');
const User = require('./models/User');
const Order = require('./models/Order');
const LineItem = require('./models/LineItem');

Product.belongsTo(Category);
Category.hasMany(Product);
Order.belongsTo(User);
User.hasMany(Order);

Order.hasMany(LineItem);
LineItem.belongsTo(Product);

const sync = ()=> conn.sync({ force: true });

const seed = ()=> {
  const products = ['foo', 'bar', 'bazz'];
  const users = ['moe', 'larry', 'curly'];
  const categoriesMap = products.reduce((memo, name)=> {
    const letter = name.slice(0, 1);
    memo[letter] = memo[letter] || [];
    memo[letter].push(name);
    return memo;
  }, {});

  let foo, bar, bazz;
  let moe, larry, curly;

  return sync()
    .then(()=> {
      const promises = products.map(name => Product.create({ name }));

      return Promise.all(promises)
        .then(result => [ foo, bar, bazz] = result) 
        .then( ()=> Object.keys(categoriesMap))
        .then( categoryNames => categoryNames.map( name => Category.create({ name })))
        .then( promises => Promise.all(promises)) 
        .then( ()=> Category.findOne({ where: { name: 'f' }}))
        .then( f => foo.setCategory(f)) 
        .then( () => Category.findOne({ where: { name: 'b' }}))
        .then( b=> Promise.all([ bar.setCategory(b), bazz.setCategory(b)]))
        .then( ()=> users.map( name => User.create({ name, password: name.toUpperCase()})))
        .then( promises => Promise.all(promises))
        .then( (result) => [ moe, larry, curly ] = result)
        .then( ()=> (
          { moe }
        ));
    });
};

module.exports = {
  models: {
    Product,
    Category,
    User,
    Order,
    LineItem
  },
  sync,
  seed
};
