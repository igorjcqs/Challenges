const joi = require("joi");

const { newError } = require("../../utils/index");

const schema = joi.object({
  productName: joi.string().required().min(3),
  productDesc: joi.string().required(),
  productPrice: joi.number().required(),
  productSize: joi.string().required().min(2),
  productColor: joi.string().required().min(3),
  productMaterial: joi.string().required().min(3),
  productSection: joi.string().required().min(3),
  productStock: joi.number().required(),
});

function validation(res, item) {
  const { error } = schema.validate(item);

  if (error) {
    return newError(res, error.details[0].message);
  }
}

module.exports = validation;
