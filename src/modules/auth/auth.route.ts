import { Router } from 'express';
import validateRequest from '@middlewares/validateRequest';
import * as authController from './auth.controller';
import * as authSchema from './auth.schema';

const router = Router();

router.post('/register', validateRequest(authSchema.authSchema, 'body'), authController.registerController);

router.post('/login', validateRequest(authSchema.authSchema, 'body'), authController.loginController);

export default router;
