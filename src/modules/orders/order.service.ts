import { OrderModel, OrderState } from './order.model';

const FLOW: OrderState[] = ['CREATED', 'ANALYSIS', 'COMPLETED'];

export function validateServices(services: any[]) {
  if (!services || services.length === 0) {
    throw new Error('Order must have services');
  }

  const total = services.reduce((sum, s) => sum + s.value, 0);
  if (total <= 0) {
    throw new Error('Total value must be greater than zero');
  }
}

export function getNextState(current: OrderState): OrderState {
  const index = FLOW.indexOf(current);
  if (index === -1 || index === FLOW.length - 1) {
    throw new Error('Invalid state transition');
  }
  return FLOW[index + 1];
}

export async function advanceOrder(id: string) {
  const order = await OrderModel.findById(id);
  if (!order) throw new Error('Order not found');

  order.state = getNextState(order.state);
  return order.save();
}
