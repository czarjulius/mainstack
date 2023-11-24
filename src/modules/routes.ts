import { Router } from 'express';
import productRoutes from './product/product.route';

const router: Router = Router();

router.use('/products', productRoutes);

export default router;
