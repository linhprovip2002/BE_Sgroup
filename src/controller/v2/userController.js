import userModel from '../../models/v2/knexUserModel';
import NotFoundError from '../../help/notFoundError.js';
// import ValidationError from '../help/ValidateError.js';

class userController {
  async getAll (req, res, next) {
    try {
      // console.log('get all user');
      const page = req.query.page || 1;
      const allUser = await userModel.getAll(page);
      // const allUser = await poolKnex('users').select('*');
      if (allUser) {
        return res.status(200).json(allUser);
      } else { throw new NotFoundError('get all user failed'); }
    } catch (err) {
      next(err);
    }
  }

  async getDetail (req, res, next) {
    try {
      const user = await userModel.getById(req.params.id);
      if (user) {
        return res.status(200).json(user);
      } else { throw new NotFoundError('get user failed'); }
    } catch (err) {
      next(err);
    }
  }

  async updateById (req, res, next) {
    let id = req.params.id;
    id = Number(id);
    const { name, age, gender, email } = req.body;
    // console.log(id, name, age, gender, email);
    await userModel.getById(id).then((user) => {
      userModel.update(id, name, age, gender, email).then((result) => {
        return res.status(200).json('update user successfully');
      }).catch(() => {
        throw new NotFoundError('update user failed');
      });
    }).catch((err) => {
      next(err);
    });
  }

  async delete (req, res, next) {
    const id = req.params.id;
    try {
      const user = await userModel.getById(id);
      if (!user) {
        throw new NotFoundError('Not found user');
      } else {
        await userModel.delete(id).then((result) => {
          return res.status(200).json('delete user successfully');
        }).catch(() => {
          throw new NotFoundError('delete user failed');
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

// eslint-disable-next-line new-cap
module.exports = new userController();