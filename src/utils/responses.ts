import { Response } from 'express';

export const response2xx = (
  res: Response,
  message: String | Document | {},
  status: number
) => {
  return res.status(status).json({
    error: false,
    statusCode: status,
    message: message,
  });
};

export const response4xx = (
  res: Response,
  message: Error | string,
  status: number
) => {
  return res.status(status).json({
    error: true,
    statusCode: status,
    message: message,
  });
};

export const response5xx = (
  res: Response,
  message: Error | String,
  status: number
) => {
  return res.status(status).json({
    error: true,
    statusCode: status,
    message: message,
  });
};
