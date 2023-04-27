import Joi from "joi";

const validate_login = Joi.object({
    username: Joi.string().required().min(3).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    password: Joi.string().required().min(3).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

const validate_register = Joi.object({
    username: Joi.string().required().min(3).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    password: Joi.string().required().min(3).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string().required().email(),
    name: Joi.string().required().min(3),
    age : Joi.number().required().min(1),
    gender: Joi.boolean().required()
});

const validate_update = Joi.object({
    name: Joi.string().required().min(3),
    age : Joi.number().required().min(1),
    email: Joi.string().required().email(),
    gender: Joi.boolean().required()
});

async function validate_register_request(req, res, next) {
    try {
      const result = await validate_register.validateAsync(req.body);
      next();
    } catch (err) {
      res.status(400).json({ error: err.details[0].message });
    }
  }

async function validate_login_request(req,res,next){
    try {
        const result = await validate_login.validateAsync(req.body);
        next();
      } catch (err) {
        // console.log("hehehe");
        res.status(400).json({ error: err.details[0].message });
      }
}
async function validate_update_request(req,res,next){
    try {
        const result = await validate_update.validateAsync(req.body);
        next();
      } catch (err) {
        res.status(400).json({ error: err.details[0].message });
      }
}

module.exports = {validate_login_request,validate_register_request,validate_update_request};
