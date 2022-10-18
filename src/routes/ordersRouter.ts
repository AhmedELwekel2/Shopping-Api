import express from 'express';
import { protect } from '../controllers/authControllers';
const ordersRouter = express.Router();
import {
  getAllOrders,
  createOrder,
  deleteAll,
  deleteOne,
  getCompletedOrders,
  getCurrentOrderByUserId
  
  
} from '../controllers/ordersControllers';

ordersRouter.post('/',protect, createOrder);
ordersRouter.get('/',protect, getAllOrders);
ordersRouter.get('/currentOrder', protect, getCurrentOrderByUserId);
ordersRouter.delete('/',protect, deleteAll);
ordersRouter.delete('/:id',protect, deleteOne);

ordersRouter.get('/completedOrders', protect, getCompletedOrders);
export default ordersRouter;
