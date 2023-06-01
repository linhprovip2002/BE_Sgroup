import poolKnex from '../../config/knex';

// const userModel = function (user) {
//   this.name = user.name;
//   this.email = user.email;
//   this.gender = user.gender;
//   this.username = user.username;
//   this.password = user.password;
//   this.salt = user.salt;
//   this.age = user.age;
//   this.passwordResetToken = user.passwordResetToken;
//   this.passwordResetExpires = user.passwordResetExpires;
//   this.createBy = user.createBy;
//   this.createAt = user.createAt;
// };

//     userModel.getAll() = function () {
//         return new Promise((resolve, reject) => {
//             poolKnex('users').select('*').then((users) => {
//                 resolve(users);
//             }).catch((err) => {
//                 reject(err);
//             });
//         });
//     }

// module.exports = userModel;
const userModel = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.gender = user.gender;
  this.username = user.username;
  this.password = user.password;
  this.salt = user.salt;
  this.age = user.age;
  this.passwordResetToken = user.passwordResetToken;
  this.passwordResetExpires = user.passwordResetExpires;
  this.createBy = user.createBy;
  this.createAt = user.createAt;
};

userModel.getAll = function (page) {
  if (page === 1) {
    return new Promise((resolve, reject) => {
      poolKnex('users')
        .select('*')
        .then((users) => {
          resolve(users);
        })
        .catch((err) => {
          reject(err);
        });
    });
  } else {
    const limit = 2; // Number of values per page
    const offset = (page - 1) * limit;
    return new Promise((resolve, reject) => {
      poolKnex('users')
        .select('*')
        .limit(limit)
        .offset(offset)
        .then((users) => {
          resolve(users);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
userModel.getByName = function (name) {
  return new Promise((resolve, reject) => {
    poolKnex('users')
      .select('*')
      .where('username', name)
      .then((user) => {
        resolve(user[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
userModel.create = function (newUser) {
  return new Promise((resolve, reject) => {
    poolKnex('users')
      .insert(newUser)
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
userModel.getById = function (id) {
  return new Promise((resolve, reject) => {
    poolKnex('users')
      .select('*')
      .where('id', id)
      .then((user) => {
        resolve(user[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
userModel.updateById = function (id, name, age, gender, email) {
  return new Promise((resolve, reject) => {
    poolKnex('users')
      .where('id', id)
      .update({
        name,
        age,
        gender,
        email
      })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
userModel.remove = function (id) {
  return new Promise((resolve, reject) => {
    poolKnex('users')
      .where('id', id)
      .del()
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
userModel.getByEmail = function (email) {
  return new Promise((resolve, reject) => {
    poolKnex('users')
      .select('*')
      .where('email', email)
      .then((user) => {
        resolve(user[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
userModel.savePasswordResetToken = function (email, token) {
  return new Promise((resolve, reject) => {
    poolKnex('users')
      .where('email', email)
      .update({
        passwordResetToken: token,
        passwordResetExpires: Date.now() + 3600000
      })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
userModel.getByPasswordResetToken = function (token) {
  return new Promise((resolve, reject) => {
    poolKnex('users')
      .select('*')
      .where('passwordResetToken', token)
      .then((user) => {
        resolve(user[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
userModel.saveResetExpire = function (email, expire) {
  return new Promise((resolve, reject) => {
    poolKnex('users')
      .where('email', email)
      .update({
        passwordResetExpires: expire
      })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
userModel.updatePassword = function (user, password, salt) {
  return new Promise((resolve, reject) => {
    poolKnex('users')
      .where('username', user.username)
      .update({
        salt,
        password
      })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = userModel;
