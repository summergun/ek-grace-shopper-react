const app = require('express').Router();
const models = require('./db').models;

module.exports = app;


app.get('/products', (req, res, next)=> {
  models.Product.findAll({ order: 'name'})
    .then( products => res.send(products ))
    .catch(next);
});

app.delete('/products/:id', (req, res, next)=> {
  models.Product.destroy({ where: { id: req.params.id}})
    .then( () => res.sendStatus(204))
    .catch(next);
});

app.post('/session', (req, res, next)=> {
  const credentials = { name, password } = req.body;
  //models.User.findOne({ where: credentials })
  console.log(credentials);
  res.sendStatus(200);
});

app.get('/categories', (req, res, next)=> {
  models.Category.findAll({ order: 'name', include: [ models.Product ]})
    .then( categories => res.send(categories ))
    .catch(next);
});
