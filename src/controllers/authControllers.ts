import jwt, { JsonWebTokenError, JwtPayload, Secret } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import pool from '../database';
import { users, user } from '../models/User';
import bcrypt, { compare } from 'bcrypt';
import { promisify } from 'util';

const User = new users();

dotenv.config();

const comparePassword = (password: string, userPassword: string) => {
  if (bcrypt.compareSync(password, userPassword)) {
    return true;
  } else return false;
};

export const signToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as Secret, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, firstname, lastname, password } = req.body;
    const u: user = { username, firstname, lastname, password };
    const newUser = await User.create(u);
    const token = signToken(newUser.id);
    res.status(300).json({
      token,
      data: newUser,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw 'please provide username and password ';
    }

    // check if the user existed
    const user = await User.getOne(username);

    if (
      !comparePassword(
        password + process.env.BCRYPT_PASSWORD,
        user.password_digest
      )
    ) {
      throw 'incorrect username or password';
    }

    const token = signToken(user.id);

    res.status(300).json({
      token,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw 'You are Not logged in! , please login and try again ';
    }
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      async (err, verfiedToken) => {
        try {
          if (err) {
            throw err;
          } else {
            const currentUser = await User.show(
              parseInt((verfiedToken as JwtPayload).id)
            );
            if (!currentUser) {
              throw 'the user belonging to this token is not existed';
            }

            req.user = parseInt((verfiedToken as JwtPayload).id);
            next();
          }
        } catch (err) {
          res.status(400).json(err);
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};
