import pool from '../config/db';

const users = function(user)
{
    this.name = user.name;
    this.email = user.email;
    this.gender = user.gender;
    this.username = user.username;
    this.password = user.password;
    this.salt = user.salt;
    this.age = user.age;
}
users.getall = (result) => {
    
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM users";
        pool.query(query, (err, users) => {
            if(err)
            {
                // console.log("Error: ", err);
                reject(err);
            }
            // console.log("Users: ", users);
            resolve(users);
        });
    });
}
users.getbyname = async (name) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE username = ?";
      pool.query(query, name, (err, user) => {
        if(err) {
        //   console.log("Error: ", err);
          reject(err);
        }
        // console.log("User: ", user);
        resolve(user[0]);
      });
    });
  }
users.create = (newUser) => {
    
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO users SET ?";
        pool.query(query, newUser, (err, user) => {
            if(err)
            {
                console.log("Error: ", err);
                reject(err);
            }
            // console.log("User: ", user.row[0]);
            resolve(user);
        });
    });
}
users.getbyid = (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE id = ?";
        pool.query(query, id, (err, user) => {
            if(err)
            {
                console.log("Error: ", err);
                reject(err);
            }
            // console.log("User: ", user);
            resolve(user[0]);
        });
    });
}
users.update = (id,name,age,gender,email)=>{
    return new Promise((resolve, reject) => {
        const query = "UPDATE users SET name = ?,age = ? gender = ? , email = ? WHERE id = ?";
        pool.query(query, [name,age,gender,email,id], (err, user) => {
            if(err)
            {
                // console.log("Error: ", err);
                reject(err);
            }
            // console.log("User: ", user);
            resolve(user);
        });
    });
}
users.delete = (id) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM users WHERE id = ?";
        pool.query(query, id, (err, user) => {
            if(err)
            {
                console.log("Error: ", err);
                reject(err);
            }
            // console.log("User: ", user);
            resolve(user);
        });
    });
}


module.exports = users;