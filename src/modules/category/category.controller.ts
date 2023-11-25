import { HTTP, RESPONSE } from '@constants/enums';
import { Request, Response, NextFunction } from 'express';
import createError from '@helpers/createError';
import * as categoryService from './category.service';
import { AddCategoryInterface } from './category.interface';
import createResponse from '@helpers/createResponse';

export const createCategoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, message, data } = await categoryService.createCategory({
      ...req.body,
    } as AddCategoryInterface);

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
