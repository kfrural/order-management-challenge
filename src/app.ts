import express from 'express';
import authRoutes from './modules/auth/auth.routes';
import orderRoutes from './modules/orders/order.routes';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);

export default app;
