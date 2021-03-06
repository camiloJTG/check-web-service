module.exports = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USER,
  password: process.env.TYPEORM_PASS,
  database: process.env.TYPEORM_DB,
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
  logging: false,
  entities: [process.env.TYPEORM_ENTITY],
};
