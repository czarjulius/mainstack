import 'module-alias/register';
import { testMongoose } from './connection';
import logger from './logger';
import app from './app';
import config from '@config';

const { port } = config();
const apiURL = `/api/${config().version}`;

app.listen(port, async function onListen() {
  testMongoose(); // test the mongoose connection.'
  logger.info(`Server is up and running at ${apiURL} on port ${port}`);
});
