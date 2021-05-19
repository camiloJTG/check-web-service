import joi from 'joi';

const nameSchema = joi.string().max(800).min(1).trim();
const isCompletedSchema = joi.boolean();
const descriptionSchema = joi.string().max(900000).min(1).trim();
const groupIdSchema = joi.number();

export const idSchema = joi.number();

export const createTaskSchema = {
  name: nameSchema.required(),
  isCompleted: isCompletedSchema.required(),
  description: descriptionSchema.required(),
  groupId: groupIdSchema.required(),
};

export const updateTaskSchema = {
  name: nameSchema,
  isCompleted: isCompletedSchema,
  description: descriptionSchema,
};
