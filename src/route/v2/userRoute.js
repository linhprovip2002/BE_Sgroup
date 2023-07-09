/* eslint-disable semi */
import express from 'express';
import userController from '../../controller/v2/userController';
import verify from '../../middleware/verify';
import { validateUpdateRequest } from '../../middleware/validateClient';
import clearCache from '../../middleware/clearCache';
import checkAuthorization from '../../middleware/authorization';
const route = express.Router();

route.get('/', userController.getAll);
route.get('/search', userController.search);
route.get('/:id', verify, checkAuthorization('Read user'), clearCache, userController.getDetail);
route.put('/:id', verify, checkAuthorization('Update user'), clearCache, validateUpdateRequest, userController.updateById);
route.delete('/:id', verify, checkAuthorization('Delete user'), clearCache, userController.delete);

module.exports = route;
