import request from 'supertest';
import mongoose from 'mongoose';
import User from '@db/models/user';
import { hashPassword } from '@helpers/password';
import app from '../../app';

describe('Aut API', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/mainstack_test');

    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('Register', () => {
    it('should register a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: hashPassword('testpassword'),
      };

      const response = await request(app).post('/auth/register').send(userData);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User registered successfully.');
      expect(response.body.data).toEqual(expect.objectContaining({ email: userData.email, token: expect.any(String) }));
    });

    it('should handle registration with an existing email', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'anotherpassword',
      };

      const response = await request(app).post('/auth/register').send(userData);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('User with this email already exists');
      expect(response.body.data).toBeNull();
    });
  });
});
