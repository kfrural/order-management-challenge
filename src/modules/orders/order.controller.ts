import { Request, Response } from 'express';
import { OrderModel } from './order.model';
import { validateServices, advanceOrder } from './order.service';

export async function createOrder(req: Request, res: Response) {
  validateServices(req.body.services);
  const order = await OrderModel.create(req.body);
  res.status(201).json(order);
}

export async function listOrders(req: Request, res: Response) {
  const { page = 1, limit = 10, state } = req.query;
  const filter = state ? { state } : {};

  const orders = await OrderModel.find(filter)
    .skip((+page - 1) * +limit)
    .limit(+limit);

  res.json(orders);
}

export async function advance(req: Request, res: Response) {
  const order = await advanceOrder(req.params.id);
  res.json(order);
}
