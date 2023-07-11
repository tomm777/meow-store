const register = require('./register');
const login = require('./login');
const mypage = require('./mypage');

module.exports = {
  ...register,
  ...login,
  ...mypage,
};
