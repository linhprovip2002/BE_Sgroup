import users from '../models/userModel.js';
import NotFoundError from '../help/NotFound_Error.js';
// import ValidationError from '../help/ValidateError.js';

class userController {
  async getall (req, res, next) {
    try {
      console.log('get all user');
      const allUser = await users.getall();
      if (allUser) {
        res.status(200).json(allUser);
      } else { throw new NotFoundError('get all user failed'); }
    } catch (err) {
      next(err);
    }
  }

  async getdetail (req, res, next) {
    try {
      const user = await users.getById(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else { throw new NotFoundError('get user failed'); }
    } catch (err) {
      next(err);
    }
  }

  async update (req, res) {
    let id = req.params.id;
    id = Number(id);
    const { name, age, gender, email } = req.body;
    console.log(id, name, age, gender, email);
    await users.getById(id).then((user) => {
      users.update(id, name, age, gender, email).then((result) => {
        res.status(200).json('update user successfully');
      }).catch((err) => {
        console.log('Error: ', err);
        res.status(500).json('update user failed');
      });
    }).catch((err) => {
      console.log('Error: ', err);
      res.status(500).json('get user failed');
    });
  }

  async delete (req, res) {
    const id = req.params.id;
    await users.delete(id).then((result) => {
      res.status(200).json('delete user successfully');
    }).catch((err) => {
      console.log('Error: ', err);
      res.status(500).json('delete user failed');
    });
  }
}

// eslint-disable-next-line new-cap
module.exports = new userController();
