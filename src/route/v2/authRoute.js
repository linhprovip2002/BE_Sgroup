import express from 'express';
import authController from '../../controller/v2/authController';
import { validateLoginRequest, validateRegisterRequest, validateEmailRequest } from '../../middleware/validateClient';
import clearCache from '../../middleware/clearCache';
const route = express.Router();

route.post('/reset-password/:passwordResetToken', clearCache, authController.resetPassword);

route.post('/forgot-password', clearCache, validateEmailRequest, authController.forgotPassword);

route.post('/register', clearCache, validateRegisterRequest, authController.register);

route.post('/login', validateLoginRequest, authController.login);

module.exports = route;
