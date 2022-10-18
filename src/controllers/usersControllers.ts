import express, { raw, Request, Response } from 'express';
import { getEnvironmentData } from 'worker_threads';
import { user, users } from '../models/User';

const User = new users();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.index();
    res.status(300).json(users);
  } catch (err) {
    res.status(400).json({ messsage: err });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, firstname, lastname, password } = req.body;
    const u: user = { username, firstname, lastname, password };

    if (!username || !firstname || !lastname || !password) {
      throw 'some required paramaters are missing';
    }

    const newUser = await User.create(u);
    res.status(300).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const user = await User.show(parseInt(req.params.id));

    if (user) {
      res.status(300).json(user);
    } else {
      throw `the user with id:${req.params.id} is not existed`;
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const deleteAll = async (req: Request, res: Response) => {
  try {
    await User.delete();
    res.status(300).json({ message: 'the users are deleted succefuly ' });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    await User.deleteOne(parseInt(req.params.id));
    res.status(300).json({
      message: `the user with id:${req.params.id}  deleted succefully`,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
