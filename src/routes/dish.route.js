import express from 'express'
import dishController from '../controllers/dish.controller.js'
import fileUpload from 'file-upload';
const dishRouter = express.Router()

dishRouter.post('/add',dishController.registerDish);

export default dishRouter