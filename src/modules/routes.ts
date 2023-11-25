import { Router } from 'express';
import productRoutes from './product/product.route';
import authRoutes from './auth/auth.route';

const router: Router = Router();

router.use('/products', productRoutes);
router.use('/auth', authRoutes);

export default router;
