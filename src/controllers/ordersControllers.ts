import express, { raw, Request, Response } from 'express';
import { order, orders } from '../models/Order';

const Order = new orders();

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.index();
    res.status(300).json(orders);
  } catch (err) {
    res.status(400).json({ messsage: err });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { user_id, products, status } = req.body;

    if (!user_id || !products || !status ) {
      throw 'some required paramaters are missing';
    }

    const o: order = {
     products,
     user_id,
     status
    };

    const newOrder = await Order.create(o);

    res.status(300).json(newOrder);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getCurrentOrderByUserId = async (req: Request, res: Response) => {
  try {
    const order = await Order.getCurrentOrder(req.user);

    if (order) {
      res.status(300).json(order);
    } else {
      throw `the order with id:${req.params.id} is not existed`;
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    await Order.deleteOne(parseInt(req.params.id));
    res.status(300).json({
      message: `the order with id:${req.params.id}  deleted succefully`,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteAll = async (req: Request, res: Response) => {
  try {
    await Order.delete();
    res.status(300).json({ message: 'the orders are deleted succefuly ' });
  } catch (err) {
    res.status(400).json(err);
  }
};



export const getCompletedOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.getCompletedOrdersByUser(req.user);
    if (!orders) {
      throw 'there is no completed orders yet for this user';
    }
    res.status(300).json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};
