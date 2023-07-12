//let secretKey; //TODO: 화면상에서 토큰이 맞지 않을시 로그아웃하는것 구현하기
let secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

function generateSecretKey() {
  if (!secretKey) {
    const crypto = require('crypto');
    secretKey = crypto.randomBytes(64).toString('hex');
  }
}

function getSecretKey() {
  return secretKey;
}

module.exports = {
  generateSecretKey,
  getSecretKey,
};
