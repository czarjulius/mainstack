import request from 'supertest';
import User from '@db/models/user';
import { hashPassword } from '@helpers/password';
import Category from '@db/models/category';
import config from '../config';
import app from '../app';

const {
  secrets: { testDbURL },
} = config();

export const DB_URL = testDbURL;

describe('Sample Test', () => {
  test('returns 1 if number is 1', () => {
    expect(1).toBe(1);
  });
});
expect(true).toBe(true);

export const createUserAndSave = async () => {
  const hashedPassword = hashPassword('testpassword');
  return await new User({ email: 'user@example.com', password: hashedPassword }).save();
};

export const loginUserAndGetToken = async () => {
  const userData = { email: 'user@example.com', password: 'testpassword' };
  const curUser = await request(app).post('/auth/login').send(userData);
  return curUser?.body?.data?.token;
};

export const createCategoryAndSave = async () => {
  return await new Category({ name: 'games' }).save();
};
