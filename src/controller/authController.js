import users from '../models/userModel.js';
import {hashpass,hashpass_salt} from '../help/hash.js';
import signjwt from '../help/sign_jwt';
class authController{
    async register(req, res){
        const {username,password,age,name,gender,email} = req.body;
        console.log(username);
        const user = await users.getbyname(username)
        if(user)
        {
            return res.status(400).json({status: false, message: "Username already exists"});
        }
        const {salt,hash_password} = hashpass(password);
           const newUser = {
                username: username,
                password: hash_password,
                age: age,
                name: name,
                email: email,
                salt: salt,
                gender:gender
            }
            users.create(newUser).then((user) => {
            res.status(200).json("create user successfully")})
            .catch((err) => {
                res.status(500).json("create user failed")
            }
            );
        }
    async login(req, res){
        const {username,password} = req.body;
        const user = await users.getbyname(username);
        if(!user)
        {
            return res.status(400).json({status: false, message: "Username does not exist"});
        }
        const hash_password = hashpass_salt(user.salt,password);

        if(hash_password !== user.password)
        {
            return res.status(400).json({status: false, message: "Password is incorrect"});
        }
        // const data = {
        //     id: user.id,
        //     username: user.username,
        // }
        const jwt = signjwt(user);
        res.status(200).json({status: true, message: "Login successfully",token: jwt});
    }
}

module.exports = new authController();