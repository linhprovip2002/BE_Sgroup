import pollController from "../../controller/v2/pollController";
import express from 'express';
import verify from '../../middleware/verify';
const route = express.Router();

route.post('/',verify ,pollController.createPoll);
route.get('/',verify ,pollController.getAll);
route.get('/:id',verify ,pollController.getDetail);


module.exports = route;