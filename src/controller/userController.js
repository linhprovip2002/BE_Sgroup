import users from '../models/userModel.js';


class userController {
    async getall(req, res) {
        await users.getall().then
            ((users) => {
                res.status(200).json(users);
            }).catch((err) => {
                console.log("Error: ", err);
                res.status(500).json("get all user failed");
            });
    }
    async getdetail(req, res) {
        await users.getbyid(req.params.id).then
            ((result) => {
                res.status(200).json(result);
            }).catch((err) => {
                console.log("Error: ", err);
                res.status(500).json("get user failed");
            });
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