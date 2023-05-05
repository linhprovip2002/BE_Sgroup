import users from '../models/userModel.js';
import NotFoundError from '../help/NotFound_Error.js';
import ValidationError from '../help/ValidateError.js';

class userController {
    async getall(req, res,next) {
        try
        {   
            const all_user = await users.getall();
            if(all_user)
            {
                res.status(200).json(all_user);
            }
            else 
             throw new NotFoundError("get all user failed");
        }catch(err)
        {
            next(err);
        }
    }
    async getdetail(req, res) {
        try
        {
            const user = await users.getbyid(req.params.id);
            if(user)
            {
                res.status(200).json(user);
            }
            else 
             throw new NotFoundError("get user failed");
        }catch(err)
        {
            next(err);
        }    
    }
    async update(req, res) {
        const id = req.params.id;
        await users.getbyid(id).then((user) => {
            users.update(id, user.name, user.age, user.gender, user.email).then((result) => {
                res.status(200).json("update user successfully");
            }).catch((err) => {
                console.log("Error: ", err);
                res.status(500).json("update user failed");
            });
        }).catch((err) => {
            console.log("Error: ", err);
            res.status(500).json("get user failed");
        })
    }
    async delete(req, res) {
        const id = req.params.id;
        await users.delete(id).then((result) => {
            res.status(200).json("delete user successfully");
        }).catch((err) => {
            console.log("Error: ", err);
            res.status(500).json("delete user failed");
        });
    }


}

module.exports = new userController();