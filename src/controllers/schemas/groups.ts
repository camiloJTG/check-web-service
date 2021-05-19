import joi from 'joi';

const nameSchema = joi.string().max(200).min(1).trim();
const isFeaturedSchema = joi.boolean();
const userId = joi.number();

export const idSchema = joi.number();

export const createGroupSchema = {
  name: nameSchema.required(),
  isFeatured: isFeaturedSchema.required(),
  userId: userId.required(),
};

export const updateGroupSchema = {
  name: nameSchema,
  isFeatured: isFeaturedSchema,
};
