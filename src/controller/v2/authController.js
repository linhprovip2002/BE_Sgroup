/* eslint-disable n/handle-callback-err */
import userModel from '../../models/v2/knexUserModel';
import { hashPass, hashPassSalt } from '../../help/hash.js';
import { signJwt, randomToken } from '../../help/signJwt.js';
import NotFoundError from '../../help/notFoundError.js';
import ValidationError from '../../help/ValidateError.js';
import mailService from '../../service/mail.service.js';
import env from 'dotenv';

env.config();
class authController {
  async register (req, res) {
    const { username, password, age, name, gender, email } = req.body;
    // console.log(username);
    const user = await userModel.getByName(username);
    if (user) {
      return res.status(400).json({ status: false, message: 'Username already exists' });
    }
    const { salt, hashPassword } = hashPass(password);
    const newUser = {
      username,
      password: hashPassword,
      age,
      name,
      email,
      salt,
      gender
    };
    userModel.create(newUser).then((user) => {
      userModel.savePasswordResetToken(email, randomToken(email));
      userModel.saveResetExpire(email, Date.now() + 3600000);
      userModel.saveCreateAt(email, new Date());
      return res.status(200).json('create user successfully');
    })
      .catch((err) => {
        return res.status(500).json('create user failed');
      }
      );
  }

  async login (req, res) {
    const { username, password } = req.body;
    const user = await userModel.getByName(username);
    if (!user) {
      return res.status(400).json({ status: false, message: 'Username does not exist' });
    }
    const hashPassword = hashPassSalt(user.salt, password);

    if (hashPassword !== user.password) {
      return res.status(400).json({ status: false, message: 'Password is incorrect' });
    }
    // const data = {
    //     id: user.id,
    //     username: user.username,
    // }
    userModel.findRole(user.id).then((roles) => {
      // console.log(roles);
      user.role = roles.map((role) => role.role_name);
      const jwt = signJwt(user);
      return res.status(200).json({ status: true, message: 'Login successfully', token: jwt });
    });
  }

  async forgotPassword (req, res, next) {
    // let email = req.params.email;
    try {
      const { email } = req.body;
      const user = await userModel.getByEmail(email);
      // console.log(user);
      if (user) {
        const htmlTemplate = `
                    <h1>Reset password</h1>
                    <p>Click the button below to reset your password.</p>
                    <a href="${process.env.CLIENT_URL}/reset-password/${user.passwordResetToken}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px;">Reset Password</a>
                    <p>The token will expire in 10 minutes.</p>
                `;

        await mailService.sendMail(
          email,
          'Reset password',
          htmlTemplate
        );
        return res.status(200).json({ status: true, message: 'Email sent successfully' });
      } else {
        throw new NotFoundError('Email does not exist');
      }
    } catch (err) {
      next(err);
    }
  }

  async resetPassword (req, res, next) {
    try {
      const passwordResetToken = req.params.passwordResetToken;
      const { password } = req.body;
      const { salt, hashPassword } = hashPass(password);
      // console.log(salt, hashPassword);
      const user = await userModel.getByPasswordResetToken(passwordResetToken);
      const token = randomToken(user.email);
      userModel.savePasswordResetToken(user.email, token).catch((err) => {
        throw new ValidationError('Update token failed');
      });
      const expired = new Date(Date.now() + 10 * 60 * 1000);
      userModel.saveResetExpire(user.email, expired).catch((err) => {
        throw new ValidationError('Update expired failed');
      });
      const resetPassword = await userModel.updatePassword(user, hashPassword, salt);
      // console.log('aaaaaa' + resetPassword);
      if (resetPassword) {
        return res.status(200).json({ status: true, message: 'Reset password successfully' });
      } else {
        throw new NotFoundError('Reset password failed');
      }
    } catch (err) {
      next(err);
    }
  }
}

// eslint-disable-next-line new-cap
module.exports = new authController();
