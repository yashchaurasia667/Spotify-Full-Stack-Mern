import Joi from "joi";
import jwt from 'jsonwebtoken'

export const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[\d\W]).{10,}$/).required(),
    name: Joi.string().required(),
    year: Joi.number().min(1900).max(new Date().getFullYear()).required(),
    month: Joi.number().min(1).max(12).required(),
    day: Joi.number().min(1).max(31).required(),
    gender: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(500).json(error);
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

export const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies
  if (token)
    jwt.verify(token, process.env.JWT_SECRET, {}, (error, info) => {
      if (error) res.status(500).json('Internal server error');
      else next();
    })
  // else res.status(200).json(false)
  else res.redirect("http://localhost:3000/login")
}