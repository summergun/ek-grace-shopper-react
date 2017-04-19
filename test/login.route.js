const expect = require('chai').expect;
const app = require('supertest')(require('../app'));

const db = require('../db');

describe('/api/login', ()=> {
  beforeEach(()=> db.seed());

  it('returns 200 with correct credentials', ()=> {
    return app.post('/api/session')
      .send({ name: 'moe', password: 'MOE'})
      .then( response => expect(response.status).to.equal(200));
  });
});
