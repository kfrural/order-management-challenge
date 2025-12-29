import { Router } from 'express';
import * as OrderController from './order.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', OrderController.createOrder);
router.get('/', OrderController.listOrders);
router.patch('/:id/advance', OrderController.advance);

export default router;
