const expect = require('chai').expect;
const db = require('../db');

describe('Product model', ()=> {
  beforeEach(() => db.seed());

  it('is seeded with three products', () => {
    return db.models.Product.findAll()
      .then( products => expect(products.length).to.equal(3))
  });
});
