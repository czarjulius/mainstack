import { Router } from 'express';
import validateRequest from '@middlewares/validateRequest';
import * as productController from './product.controller';
import * as productSchema from './product.schema';
// import { isLoggedIn, isAdmin } from "@helpers/authentication";

const router = Router();

router.post('/', validateRequest(productSchema.createProductSchema, 'body'), productController.createProductController);

router.get('/', validateRequest(productSchema.getProductsSchema, 'query'), productController.getProductsController);

router.get(
  '/:productId',
  validateRequest(productSchema.getProductSchema, 'params'),
  productController.getProductController
);

router.patch(
  '/:productId',
  validateRequest(productSchema.updateProductSchema, 'body'),
  productController.updateProductByIdController
);

router.delete(
  '/:productId',
  validateRequest(productSchema.getProductSchema, 'params'),
  productController.deleteProductByIdController
);

export default router;
