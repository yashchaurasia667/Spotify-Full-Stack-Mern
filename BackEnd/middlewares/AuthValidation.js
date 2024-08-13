import Joi from "joi";

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(10)
      .pattern(/[a-zA-Z][\d\W]/)
      .required(),
    name: Joi.string().min(1).required(),
    year: Joi.number().min(1900).max(new Date().getFullYear()).required(),
    month: Joi.number().min(1).max(31).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request" }, error);
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(10)
      .pattern(/[a-zA-Z][\d\W]/)
      .required(),
    name: Joi.string().min(1).required(),
    year: Joi.number().min(1900).max(new Date().getFullYear()).required(),
    month: Joi.number().min(1).max(31).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad request" }, error);
  }
  next();
};

export { signupValidation, loginValidation };
