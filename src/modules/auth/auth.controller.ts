import { Request, Response } from 'express';
import * as AuthService from './auth.service';

export async function register(req: Request, res: Response) {
  const user = await AuthService.register(req.body.email, req.body.password);
  res.status(201).json(user);
}

export async function login(req: Request, res: Response) {
  const token = await AuthService.login(req.body.email, req.body.password);
  res.json({ token });
}
