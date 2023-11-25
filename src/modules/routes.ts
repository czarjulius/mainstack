import { Router } from 'express';
import productRoutes from './product/product.route';
import authRoutes from './auth/auth.route';
import categoryRoutes from './category/category.route';

const router: Router = Router();

router.use('/products', productRoutes);
router.use('/auth', authRoutes);
router.use('/category', categoryRoutes);

export default router;
