const Joi = require('@hapi/joi').extend(require('@joi/date'));

export const authSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().required(),
});
