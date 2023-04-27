import jwt from 'jsonwebtoken';

function signjwt(user)
{
    return jwt.sign({
        id : user.id,
        username : user.username,
    }, process.env.JWT_SECRET,{ expiresIn: '2h' ,algorithm: 'HS256'});
}
module.exports = signjwt;