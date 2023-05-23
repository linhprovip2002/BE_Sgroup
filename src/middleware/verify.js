import jwt from 'jsonwebtoken';
// import users from '../models/userModel.js';
import env from 'dotenv';
env.config();

module.exports = async function verify (req, res, next) {
  // console.log("header: " + req.headers.authorization);
  await Promise.resolve(req.headers.authorization).then((accessToken) => {
    const token = accessToken.split(' ')[1];
    token
      ? jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        console.log(token);
        if (err) {
          console.log(err);
          return res.status(403).json('Forbidden');
        } else {
          req.user = decoded;
          next();
        }
      })
      : res.status(401).json('Unauthorized');
  }).catch((err) => {
    console.log(err);
    res.status(401).json('Unauthorized');
  });
};
