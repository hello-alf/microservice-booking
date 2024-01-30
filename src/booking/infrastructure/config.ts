import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  console.log('process.env.MONGO_HOST', process.env.MONGO_HOST);
  console.log('process.env', process.env);
  return {
    mongo: {
      dbName: process.env.MONGO_DB || 'NUR-BOOKING-DB',
      user: process.env.MONGO_INITDB_ROOT_USERNAME || 'mongo',
      password: process.env.MONGO_INITDB_ROOT_PASSWORD || 'secret',
      port: parseInt(process.env.MONGO_PORT, 10) || 27018,
      host: process.env.MONGO_HOST || 'localhost',
      connection: process.env.MONGO_CONNECTION || 'mongodb',
    },
  };
});
