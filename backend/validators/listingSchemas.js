const Joi = require('joi');

const baseListing = {
  title: Joi.string().trim().min(2).max(200),
  description: Joi.string().trim().allow('', null),
  category: Joi.string().trim().required(),
  price: Joi.number().min(0).required(),
  location: Joi.string().trim().allow('', null),
  images: Joi.array().items(Joi.string().trim().uri()).default([]),
  rating: Joi.number().min(0).max(5),
};

const createListingSchema = Joi.object({
  ...baseListing,
});

const updateListingSchema = Joi.object({
  title: Joi.string().trim().min(2).max(200),
  description: Joi.string().trim().allow('', null),
  category: Joi.string().trim(),
  price: Joi.number().min(0),
  location: Joi.string().trim().allow('', null),
  images: Joi.array().items(Joi.string().trim().uri()),
  rating: Joi.number().min(0).max(5),
}).min(1);

module.exports = {
  createListingSchema,
  updateListingSchema,
};

