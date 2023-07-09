import userModel from '../../models/v2/knexUserModel';
import NotFoundError from '../../help/notFoundError.js';
// import ValidationError from '../help/ValidateError.js';
import CacheService from '../../service/cache.service';

class userController {
  async getAll (req, res, next) {
    try {
      // console.log('get all user');
      const page = req.query.page || 1;
      // const allUser = await userModel.getAll(page);
      CacheService.get('users', 888).then((result) => {
        // console.log(result);
        if (result != null) {
          console.log('get from cache');
          return res.status(200).json(result);
        } else {
          console.log('get from db');
          userModel.getAll(page).then((result) => {
            CacheService.set('users', 888, result);
            return res.status(200).json(result);
          }).catch((err) => {
            next(err);
          });
        }
      });
      // const allUser = await poolKnex('users').select('*');
      // if (allUser) {
      //   CacheService.set('users', 888, allUser);
      //   return res.status(200).json(allUser);
      // } else { throw new NotFoundError('get all user failed'); }
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

  async search (req, res, next) {
    const { name, age, gender, email } = req.query;
    try {
      const searchUser = await userModel.search(name, age, gender, email);
      if (searchUser) {
        return res.status(200).json(searchUser);
      } else {
        throw new NotFoundError('search user failed');
      }
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
      userModel.updateById(id, name, age, gender, email).then((result) => {
        // cacheService.delete('users', 888);
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
