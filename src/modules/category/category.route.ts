import { Router } from 'express';
import validateRequest from '@middlewares/validateRequest';
import * as categoryController from './category.controller';
import * as categorySchema from './category.schema';
import { isLoggedIn } from '@helpers/authentication';
const router = Router();

router.post(
  '/',
  isLoggedIn,
  validateRequest(categorySchema.createCategorySchema, 'body'),
  categoryController.createCategoryController
);

export default router;
