import express, { Request, Response } from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import userRouter from './routes/usersRouter';
import productsRouter from './routes/productsRouter';
import ordersRouter from './routes/ordersRouter';
dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.status(300).json({
    message: 'welcome to store Api ',
  });
});

app.use('/users', userRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

export default app;
