import users from '../../models/v1/userModel.js';
import NotFoundError from '../../help/notFoundError.js';
// import ValidationError from '../help/ValidateError.js';

class userController {
  async getAll (req, res, next) {
    try {
      console.log('get all user');
      const allUser = await users.getAll();
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
      const user = await users.getById(req.params.id);
      if (user) {
        res.status(200).json(user);
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
    await users.getById(id).then((user) => {
      users.update(id, name, age, gender, email).then((result) => {
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
      const user = await users.getById(id);
      if (!user) {
        throw new NotFoundError('Not found user');
      } else {
        await users.delete(id).then((result) => {
          return res.status(200).json('delete user successfully');
        }).catch(() => {
          throw new NotFoundError('delete user failed');
        });
      }
    } catch (err) {
      next(err);
    }
  }
  async search (req, res, next) {
    const {name, age, gender, email} = req.query;
    try{
     const searchUser = await users.search(name,age,gender,email);
      if(searchUser){
        return res.status(200).json(searchUser);
      }else{
        throw new NotFoundError('search user failed');
      }
    }catch(err){
      next(err);
    }
  }   
}

// eslint-disable-next-line new-cap
module.exports = new userController();
