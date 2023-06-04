/* eslint-disable semi */
import express from 'express';
import userController from '../../controller/v2/userController';
import verify from '../../middleware/verify';
import { validateUpdateRequest } from '../../middleware/validateClient';
const route = express.Router();
// import errorHandler from "../middleware/error_handling";
route.get('/', userController.getAll);
route.get('/search', userController.search);
route.get('/:id', verify, userController.getDetail);
route.put('/:id', verify, validateUpdateRequest, userController.updateById);
route.delete('/:id', verify, userController.delete);
// route.use(errorHandler());

module.exports = route;
