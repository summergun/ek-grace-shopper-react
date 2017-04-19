const expect = require('chai').expect;
const app = require('supertest')(require('../app'));
const jwt = require('jwt-simple');

const db = require('../db');

describe('session routes', ()=> {
  describe('POST /api/session', ()=> {
    let moe;
    beforeEach(()=> db.seed().then(result=> moe = result.moe ));

    it('returns 200 with correct credentials', ()=> {
      return app.post('/api/session')
        .send({ name: 'moe', password: 'MOE'})
        .then( response => expect(response.status).to.equal(200));
    });
    
    it('returns 200 and a jwt token with correct credentials', ()=> {
      const token = jwt.encode({id: moe.id}, process.env.JWT_SECRET);
      return app.post('/api/session')
        .send({ name: 'moe', password: 'MOE'})
        .then( response => expect(response.body.token).to.equal(token));
    });

    it('returns 401 with empty credentials', ()=> {
      return app.post('/api/session')
        .send({ })
        .then( response => expect(response.status).to.equal(401));
    });
  });
});

describe('session routes', ()=> {
  describe('GET /api/session', ()=> {
    beforeEach(()=> db.seed().then(result=> moe = result.moe ));

    it('a valid token can be exchanged for a user', ()=> {
      const token = jwt.encode({id: moe.id}, process.env.JWT_SECRET);
      return app.get(`/api/session/${token}`)
        .then( response => expect(response.status).to.equal(200));
    });

    it('an invalid token can not be exchanged for a user', ()=> {
      return app.get(`/api/session/fizz`)
        .then( response => expect(response.status).to.equal(401));
    });
    
  });
});
