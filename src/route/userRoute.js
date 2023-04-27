import  express  from "express";
const route = express.Router();
import authController from '../controller/userController';
import  verify from "../middleware/verify";


route.get('/', authController.getall);
route.get('/:id',verify, authController.getdetail);
route.put('/:id',verify, authController.update);
route.delete('/:id',verify, authController.delete);


module.exports = route;