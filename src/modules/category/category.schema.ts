const Joi = require('@hapi/joi').extend(require('@joi/date'));

export const createCategorySchema = Joi.object({
  name: Joi.string().trim().required(),
});
