import { HTTP, RESPONSE } from '@constants/enums';
import { Request, Response, NextFunction } from 'express';
import createError from '@helpers/createError';
import * as productService from './product.service';
import createResponse from '@helpers/createResponse';
import { AddProductInterface, GetProductInterface } from './product.interface';

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

export const createProductController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, message, data } = await productService.createProduct({
      ...req.body,
    } as AddProductInterface);

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

export const getProductController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;

    const { error, message, data } = await productService.getProductById({
      productId,
    } as GetProductInterface);

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

export const updateProductByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    const { error, message, data } = await productService.updateProductById({
      productId,
      ...req.body,
    } as AddProductInterface);

    if (error) {
      return next(
        createError(HTTP.BAD_REQUEST, {
          status: RESPONSE.ERROR,
          message,
          data,
        })
      );
    }
    return createResponse(message, data as any)(res, HTTP.OK);
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err as any));
  }
};

export const deleteProductByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    const { error, message, data } = await productService.deleteProductById({
      productId,
    } as GetProductInterface);

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
