import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    mongo: {
      dbName: process.env.MONGO_DB || 'nurbnb',
      user: process.env.MONGO_INITDB_ROOT_USERNAME || 'mongo',
      password: process.env.MONGO_INITDB_ROOT_PASSWORD || 'secret',
      port: parseInt(process.env.MONGO_PORT, 10) || 27018,
      host: process.env.MONGO_HOST || 'localhost',
      connection: process.env.MONGO_CONNECTION || 'mongodb',
    },
  };
});
