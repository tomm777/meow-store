let secretKey;

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
