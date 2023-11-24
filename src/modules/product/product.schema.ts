const Joi = require('@hapi/joi').extend(require('@joi/date'));

export const getProductsSchema = Joi.object({
  page: Joi.number().positive(),
  limit: Joi.number().positive().min(1).max(100),
});

export const createProductSchema = Joi.object({
  name: Joi.string().trim().required(),
  description: Joi.string().trim(),
  // categoryId: Joi.string().trim().required(),
  productImage: Joi.string().trim().required(),
  price: Joi.number().required(),
});
