export default {
  app: {
    port: process.env.APP_PORT,
    dev: process.env.NODE_ENV !== 'production',
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
  },
};
