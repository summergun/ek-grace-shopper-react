const conn = require('../conn'); 

const User = conn.define('user', {
  name: {
    type: conn.Sequelize.STRING,
    unique: true
  },
  password: conn.Sequelize.STRING
});

module.exports = User;
