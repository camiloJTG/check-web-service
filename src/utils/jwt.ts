import jwt from 'jsonwebtoken';
import config from '../configs/config';

const { secret } = config.jwt;

export const createToken = (payload: {}) => {
  const timeExpire = 7200;
  const token = jwt.sign(payload, secret, {
    expiresIn: timeExpire,
  });
  const tokenStructure = {
    token,
    type: 'Bearer',
    expiresIn: `${timeExpire} seconds`,
  };
  return tokenStructure;
};

export const verifyToken = (token: string) => {
  const isValid = jwt.verify(token, secret);
  return isValid;
};
