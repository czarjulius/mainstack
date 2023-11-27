import 'module-alias/register';
import { testMongoose } from './connection';
import logger from './logger';
import app from './app';
import config from '@config';

const { port } = config();

app.listen(port, async function onListen() {
  testMongoose(); // test the mongoose connection.'
  logger.info(`Server is up and running on port ${port}`);
});
