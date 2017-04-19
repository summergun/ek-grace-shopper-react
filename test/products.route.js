const expect = require('chai').expect;
const app = require('supertest')(require('../app'));

const db = require('../db');

describe('/api/products', ()=> {
  beforeEach(()=> db.seed());

  it('returns 3 products', ()=> {
    return app.get('/api/products')
      .then( response => expect(response.body.length).to.equal(3));
  });
});

describe('/api/categories', ()=> {
  beforeEach(()=> db.seed());

  it('returns 3 products', ()=> {
    return app.get('/api/categories')
      .then( response => expect(response.body.length).to.equal(2));
  });
});
