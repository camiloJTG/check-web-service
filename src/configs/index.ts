import './database';
import express from './server';
import config from './config';

const { app } = config;
const { port } = app;

const main = () => {
  express.listen(port);
  console.log(`Server on port ${port}`);
};

main();
