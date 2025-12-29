import { Schema, model, Document } from 'mongoose';

export type OrderState = 'CREATED' | 'ANALYSIS' | 'COMPLETED';

export interface IService {
  name: string;
  value: number;
  status: 'PENDING' | 'DONE';
}

export interface IOrder extends Document {
  lab: string;
  patient: string;
  customer: string;
  state: OrderState;
  status: 'ACTIVE' | 'DELETED';
  services: IService[];
}

const ServiceSchema = new Schema<IService>({
  name: String,
  value: Number,
  status: { type: String, enum: ['PENDING', 'DONE'] },
});

const OrderSchema = new Schema<IOrder>({
  lab: String,
  patient: String,
  customer: String,
  state: {
    type: String,
    enum: ['CREATED', 'ANALYSIS', 'COMPLETED'],
    default: 'CREATED',
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'DELETED'],
    default: 'ACTIVE',
  },
  services: { type: [ServiceSchema], required: true },
});

export const OrderModel = model<IOrder>('Order', OrderSchema);
