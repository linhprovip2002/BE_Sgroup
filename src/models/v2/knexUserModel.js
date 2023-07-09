// import { query } from 'express';
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

userModel.saveCreateAt = function (email, createAt) {
  // console.log("saveCreateAt");
  return new Promise((resolve, reject) => {
    poolKnex('users')
      .where('email', email)
      .update({
        createdAt: createAt
      })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

userModel.getAll = function (page) {
  // console.log(page);
  // eslint-disable-next-line eqeqeq
  if (page == 1) {
    return new Promise((resolve, reject) => {
      poolKnex('users')
        .select('*')
        .then((users) => {
          console.log(users);
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
        // console.log('Error: ', err);
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

userModel.getNameById = function (id) {
  return new Promise((resolve, reject) => {
    poolKnex('users').select('name').where('id', id).then((user) => {
      resolve(user[0].name);
    }).catch((err) => {
      reject(err);
    });
  });
};

userModel.search = (name, age, gender, email) => {
  return new Promise((resolve, reject) => {
    let query = poolKnex('users').select('*');
    if (name) {
      query = query.where('name', 'like', `%${name}%`);
    }
    if (age) {
      query = query.andWhere('age', 'like', `%${age}%`);
    }
    if (gender) {
      query = query.andWhere('gender', 'like', `%${gender}%`);
    }
    if (email) {
      query = query.andWhere('email', 'like', `%${email}%`);
    }
    query
      .then((users) => {
        resolve(users);
      })
      .catch((err) => {
        console.log('Error: ', err);
        reject(err);
      });
  });
};

userModel.findRole = (id) => {
  return new Promise((resolve, reject) => {
    poolKnex('role')
      .join('user_role', 'role.role_id', '=', 'user_role.role_id')
      .join('users', 'users.id', '=', 'user_role.user_id')
      .select('*')
      .where('users.id', id)
      .then((roles) => {
        resolve(roles);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
userModel.findPermission = (role) => {
  return new Promise((resolve, reject) => {
    poolKnex('permissions').select('permissions.permission_name')
      .from('permissions')
      .join('role_permission', 'permissions.permission_id', '=', 'role_permission.permission_id')
      .join('role', 'role.role_id', '=', 'role_permission.role_id')
      .where('role.role_name', role).then((permissions) => {
        // console.log(permissions);
        resolve(permissions);
      }
      ).catch((err) => {
        reject(err);
      }
      );
  });
};

module.exports = userModel;
