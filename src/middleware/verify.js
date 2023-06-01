import jwt from 'jsonwebtoken';
// import users from '../models/userModel.js';
import env from 'dotenv';
env.config();

module.exports = async function verify (req, res, next) {
  // console.log("header: " + req.headers.authorization);
  await Promise.resolve(req.headers.authorization).then((accessToken) => {
    try {
      const token = accessToken.split(' ')[1];
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          console.log(token);
          if (err) {
            console.log(err);
            return res.status(403).json('Forbidden');
          } else {
            req.user = decoded;
            next();
          }
        });
      } else {
        throw new Error('No token provided');
      }
    } catch (err) {
      // console.log(err);
      next(err);
    }
  });
};
