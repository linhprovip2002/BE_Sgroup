/* eslint-disable no-unused-vars */
/* eslint-disable prefer-regex-literals */
import Joi from 'joi';

const validateLogin = Joi.object({
  username: Joi.string().required().min(3).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  password: Joi.string().required().min(3).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});

const validateRegister = Joi.object({
  username: Joi.string().required().min(3).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  password: Joi.string().required().min(3).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  email: Joi.string().required().email(),
  name: Joi.string().required().min(3),
  age: Joi.number().required().min(1),
  gender: Joi.boolean().required()
});

const validateUpdate = Joi.object({
  name: Joi.string().required().min(3),
  age: Joi.number().required().min(1),
  email: Joi.string().required().email(),
  gender: Joi.boolean().required()
});
const validateEmail = Joi.object({
  email: Joi.string().required().email()
});
async function validateEmailRequest (req, res, next) {
  try {
    const result = await validateEmail.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).json({ error: err.details[0].message });
  }
}

async function validateRegisterRequest (req, res, next) {
  try {
    const result = await validateRegister.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).json({ error: err.details[0].message });
  }
}

async function validateLoginRequest (req, res, next) {
  try {
    const result = await validateLogin.validateAsync(req.body);
    next();
  } catch (err) {
    // console.log("hehehe");
    res.status(400).json({ error: err.details[0].message });
  }
}
async function validateUpdateRequest (req, res, next) {
  try {
    const result = await validateUpdate.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).json({ error: err.details[0].message });
  }
}

module.exports = { validateLoginRequest, validateRegisterRequest, validateUpdateRequest, validateEmailRequest };
