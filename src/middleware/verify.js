import jwt from 'jsonwebtoken';
// import users from '../models/userModel.js';
import env from 'dotenv';
env.config();

module.exports = async function verify (req, res, next) {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      // return res.status(403).json('Forbidden');
      throw new Error('No token provided');
    }

    const token = accessToken.split(' ')[1];
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        // console.log(token);
        if (err) {
          console.log(err);
          next(err);
        } else {
          req.user = decoded;
          next();
        }
      });
    } else {
      throw new Error('No token provided');
    }
  } catch (err) {
    next(err);
  }
};
