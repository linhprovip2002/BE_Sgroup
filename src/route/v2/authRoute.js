import express from 'express';
import authController from '../../controller/v2/authController';
import { validateLoginRequest, validateRegisterRequest, validateEmailRequest } from '../../middleware/validateClient';

const route = express.Router();

route.post('/reset-password/:passwordResetToken', authController.resetPassword);

route.post('/forgot-password', validateEmailRequest, authController.forgotPassword);

route.post('/register', validateRegisterRequest, authController.register);

route.post('/login', validateLoginRequest, authController.login);

module.exports = route;
