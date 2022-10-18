import express, { raw, Request, Response } from 'express';
import { product, products } from '../models/Product';

const Product = new products();

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
      throw 'some required paramaters are missing';
    }

    const p: product = { name, price, category };

    const newProduct = await Product.create(p);

    res.status(300).json(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.index();
    res.status(300).json(products);
  } catch (err) {
    res.status(400).json({ messsage: err });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const product = await Product.show(parseInt(req.params.id));

    if (product) {
      res.status(300).json(product);
    } else {
      throw `the product with id:${req.params.id} is not existed`;
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const deleteAll = async (req: Request, res: Response) => {
  try {
    await Product.delete();
    res.status(300).json({ message: 'the Products are deleted succefuly ' });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    await Product.deleteOne(parseInt(req.params.id));
    res.status(300).json({
      message: `the product with id:${req.params.id}  deleted succefully`,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getByCategory = async (req: Request, res: Response) => {
  try {
    const products = await Product.getByCategory(req.params.category);
    res.status(300).json(products);
  } catch (err) {
    res.status(400).json(err);
  }
};
