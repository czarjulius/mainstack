import { HTTP, RESPONSE } from '@constants/enums';
import { Request, Response, NextFunction } from 'express';
import createError from '@helpers/createError';
import * as authService from './auth.service';
import { AuthInterface } from './auth.interface';
import createResponse from '@helpers/createResponse';

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, message, data } = await authService.createUser({
      ...req.body,
    } as AuthInterface);

    if (error) {
      return next(
        createError(HTTP.BAD_REQUEST, {
          status: RESPONSE.ERROR,
          message,
          data,
        })
      );
    }
    return createResponse(message, data)(res, HTTP.OK);
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err as any));
  }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, message, data } = await authService.login({
      ...req.body,
    } as AuthInterface);

    if (error) {
      return next(
        createError(HTTP.BAD_REQUEST, {
          status: RESPONSE.ERROR,
          message,
          data,
        })
      );
    }
    return createResponse(message, data)(res, HTTP.OK);
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err as any));
  }
};
