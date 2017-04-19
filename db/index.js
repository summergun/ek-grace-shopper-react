const conn = require('./conn'); 
const Product = require('./models/Product');
const Category = require('./models/Category');

Product.belongsTo(Category);
Category.hasMany(Product);

const sync = ()=> conn.sync({ force: true });

const seed = ()=> {
  const products = ['foo', 'bar', 'bazz'];
  const categoriesMap = products.reduce((memo, name)=> {
    const letter = name.slice(0, 1);
    memo[letter] = memo[letter] || [];
    memo[letter].push(name);
    return memo;
  }, {});

  let foo, bar, bazz;

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
        .then( b=> Promise.all([ bar.setCategory(b), bazz.setCategory(b)]));
    });
};

module.exports = {
  models: {
    Product,
    Category
  },
  sync,
  seed
};
