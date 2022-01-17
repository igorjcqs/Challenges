const joi = require("joi");

const { newError } = require("../../utils/index");

const schema = joi.object({
  firstName: joi
    .string()
    .required()
    .min(2)
    .max(255)
    .pattern(/^([^0-9]*)$/)
    .messages({
      "string.pattern.base": "Your first name cannot contain numbers.",
    }),
  lastName: joi
    .string()
    .required()
    .min(2)
    .max(255)
    .pattern(/^([^0-9]*)$/)
    .messages({
      "string.pattern.base": "Your last name cannot contain numbers.",
    }),
  email: joi.string().required().email().max(255),
  password: joi.string().required().min(8).max(255),
});

function validation(res, item) {
  const { error } = schema.validate(item);

  if (error) {
    return newError(res, error.details[0].message);
  }
}

module.exports = validation;
