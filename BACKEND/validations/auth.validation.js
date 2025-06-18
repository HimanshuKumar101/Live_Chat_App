// validations/auth.validation.js
const { Joi, Segments } = require("celebrate");

exports.signupValidation = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phoneno: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required(),

    countryCode: Joi.object({
      dialCode: Joi.string().required(),
    }),

    profilePic: Joi.string().uri().allow("").optional(),
    bio: Joi.string().max(500).allow("").optional(),
  }),
};

exports.loginValidation = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
};
