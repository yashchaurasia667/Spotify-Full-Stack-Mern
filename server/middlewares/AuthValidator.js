import Joi from "joi";

export const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[\d\W]).{10,}$/).required(),
    name: Joi.string().required(),
    year: Joi.number().min(1900).max(new Date().getFullYear()).required(),
    month: Joi.number().min(1).max(12).required(),
    day: Joi.number().min(1).max(31).required()
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).json(error);
  next();
}

export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).json(error);

  next();
}