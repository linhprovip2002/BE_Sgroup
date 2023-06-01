import jwt from 'jsonwebtoken';
import crypto from 'crypto';
function signJwt (user) {
  return jwt.sign({
    id: user.id,
    username: user.username
  }, process.env.JWT_SECRET, { expiresIn: '2h', algorithm: 'HS256' });
}
function randomToken (plainText) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hashObject = crypto.createHash('sha256');
  const hashText = hashObject.update(plainText + salt).digest('hex');
  return hashText;
}
module.exports = { signJwt, randomToken };
