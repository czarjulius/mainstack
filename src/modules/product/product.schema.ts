const Joi = require('@hapi/joi').extend(require('@joi/date'));

export const getProductsSchema = Joi.object({
  page: Joi.number().positive(),
  limit: Joi.number().positive().min(1).max(100),
  name: Joi.string(),
  category: Joi.string(),
  productId: Joi.string(),
  price: Joi.number().positive().min(1),
});

export const createProductSchema = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().trim(),
  category: Joi.string().trim().required(),
  productImage: Joi.string().trim().required(),
  price: Joi.number().required(),
});

export const getProductSchema = Joi.object({
  productId: Joi.string().trim().required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().trim(),
  description: Joi.string().trim(),
  category: Joi.string().trim().required(),
  productImage: Joi.string().trim(),
  price: Joi.number(),
});
