import  express  from "express";
const route = express.Router();
import authController from '../controller/authController';
import {validate_login_request,validate_register_request,validate_update_request} from '../middleware/validate_client';


route.post('/register',validate_register_request , authController.register)
route.post('/login', validate_login_request ,authController.login);

module.exports = route;