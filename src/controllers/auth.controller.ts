import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserModel } from '../models/user.model';
import { ENV } from '../config/env.config';

type UserJWTPayload = { _id: string; name: string; email: string };

function signToken(user: UserJWTPayload) {
  return jwt.sign({ user }, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN as any,
  });
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: 'name, email, password required 😫' });

    const existingUser = await UserModel.findOne({ email }).lean();
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists 🙁' });
    }

    // ALGORITMO BCRYPT PARA HASHEAR CONTRASEÑA
    const hashedPassword = await bcrypt.hash(password, ENV.BCRYPT_SALT_ROUNDS);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = signToken({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
    res.status(201).json({
      message: 'User registered successfully 🎉',
      token,
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'email, password required 😫' });

    const userFound = await UserModel.findOne({ email }).lean();
    if (!userFound)
      return res.status(401).json({ message: 'Invalid credentials 😫' });

    const isPasswordValid = await bcrypt.compare(password, userFound.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: 'Invalid credentials 😫' });

    const token = signToken({
      _id: userFound._id,
      name: userFound.name,
      email: userFound.email,
    });
    res.json({
      message: 'Login successful 🎉',
      token,
    });
  } catch (err) {
    next(err);
  }
}
