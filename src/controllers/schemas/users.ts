import joi from 'joi';

const mailSchema = joi.string().max(600).min(2).trim();
const passwordSchema = joi.string().max(600).min(2).trim();

export const idSchema = joi.number();

export const createUserSchema = {
  mail: mailSchema.required(),
  password: passwordSchema.required(),
};

export const updateUserSchema = {
  mail: mailSchema,
  password: passwordSchema,
};
