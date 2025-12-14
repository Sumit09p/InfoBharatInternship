// backend/validators/authSchemas.js
const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().trim().lowercase().email().required(),
  phone: Joi.string().trim().optional().allow(''),
  password: Joi.string().min(6).required(),
  avatarUrl: Joi.string().uri().optional().allow(''),
  role: Joi.string().valid('buyer', 'seller').optional(), // admin not allowed via public register
});

const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
