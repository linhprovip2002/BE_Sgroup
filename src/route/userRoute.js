import  express  from "express";
const route = express.Router();
import authController from '../controller/userController';
import  verify from "../middleware/verify";
// import errorHandler from "../middleware/error_handling";



route.get('/', authController.getall);
route.get('/:id',verify, authController.getdetail);
route.put('/:id',verify, authController.update);
route.delete('/:id',verify, authController.delete);
// route.use(errorHandler());

module.exports = route;