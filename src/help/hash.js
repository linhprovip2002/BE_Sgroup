import crypto from 'crypto';

function hashPass (plaintext) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hashObject = crypto.createHash('sha256');
  const hashPassword = hashObject.update(plaintext + salt).digest('hex');
  return { salt, hashPassword };
}
function hashPassSalt (salt, plaintext) {
  const hashObject = crypto.createHash('sha256');
  const hashPassword = hashObject.update(plaintext + salt).digest('hex');
  return hashPassword;
}
module.exports = { hashPass, hashPassSalt };
