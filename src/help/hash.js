import crypto from 'crypto';

function hashpass(plaintext)
{
    const salt = crypto.randomBytes(16).toString('hex');
    const hashObject = crypto.createHash('sha256');
    const hash_password = hashObject.update(plaintext+salt).digest('hex');
    return {salt, hash_password};
}
function hashpass_salt(salt,plaintext)
{
    const hashObject = crypto.createHash('sha256');
    const hash_password = hashObject.update(plaintext+salt).digest('hex');
    return hash_password;
}
module.exports = {hashpass,hashpass_salt}