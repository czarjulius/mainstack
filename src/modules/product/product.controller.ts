import { HTTP, RESPONSE } from '@constants/enums';
import { Request, Response, NextFunction } from 'express';
import createError from '@helpers/createError';
import * as productService from './product.service';
import createResponse from '@helpers/createResponse';
// import { GetProductsInterface } from './product.interface';

export const getProductsController = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const { error, message, data } = await productService.getAllProducts();

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
    return next(createError.InternalServerError(err));
  }
};
