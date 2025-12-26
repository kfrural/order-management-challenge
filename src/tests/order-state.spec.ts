import { describe, it, expect } from 'vitest';
import { getNextState } from '../modules/orders/order.service';

describe('Order State Flow', () => {
  it('CREATED -> ANALYSIS', () => {
    expect(getNextState('CREATED')).toBe('ANALYSIS');
  });

  it('ANALYSIS -> COMPLETED', () => {
    expect(getNextState('ANALYSIS')).toBe('COMPLETED');
  });

  it('COMPLETED should fail', () => {
    expect(() => getNextState('COMPLETED')).toThrow();
  });
});
