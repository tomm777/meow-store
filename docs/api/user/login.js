const join = require('./join');
const login = require('./login');
const logout = require('./logout');

module.exports = {
  ...join,
  ...login,
  ...logout,
};
