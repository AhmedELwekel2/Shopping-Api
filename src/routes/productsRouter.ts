import express from 'express';
import { protect } from '../controllers/authControllers';
import {
  createProduct,
  getAllProducts,
  getOne,
  deleteAll,
  deleteOne,
  getByCategory,
} from '../controllers/productsControllers';
const productsRouter = express.Router();

productsRouter.post('/', protect, createProduct);
productsRouter.get('/', getAllProducts);
productsRouter.get('/:id', getOne);
productsRouter.delete('/', deleteAll);
productsRouter.delete('/:id', deleteOne);
productsRouter.get('/category/:category', getByCategory);
export default productsRouter;
