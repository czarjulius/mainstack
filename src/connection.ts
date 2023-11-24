import mongoose from 'mongoose';
import config from '@config';

const {
  secrets: { dbURL },
} = config();

export const testMongoose: () => Promise<void> = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
