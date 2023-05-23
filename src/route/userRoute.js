/* eslint-disable semi */
import express from 'express';
import authController from '../controller/userController';
import verify from '../middleware/verify';
const route = express.Router();
// import errorHandler from "../middleware/error_handling";
route.get('/', authController.getall);
route.get('/:id', verify, authController.getdetail);
route.put('/:id', verify, authController.update);
route.delete('/:id', verify, authController.delete);
// route.use(errorHandler());

module.exports = route;
