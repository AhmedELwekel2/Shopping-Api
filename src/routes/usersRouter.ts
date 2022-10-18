import express from 'express';
import {
  createUser,
  getAllUsers,
  getOne,
  deleteAll,
  deleteOne,
} from '../controllers/usersControllers';
import { signUp, signIn, protect } from '../controllers/authControllers';
const userRouter = express.Router();

userRouter.post('/', protect, createUser);
userRouter.get('/', protect, getAllUsers);
userRouter.get('/:id', protect, getOne);
userRouter.delete('/', protect, deleteAll);
userRouter.delete('/:id', protect, deleteOne);
userRouter.post('/sign-up', signUp);
userRouter.post('/sign-in', signIn);

export default userRouter;
