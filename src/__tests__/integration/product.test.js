import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { hashPassword } from '@helpers/password';
import app from '../../app';

const categoryId = new mongoose.Types.ObjectId().toString();
const userId = new mongoose.Types.ObjectId().toString();

export const productPayload = {
  name: 'hp laptop ',
  description: 'Lorem Ipsum is simply dummy text of the unchanged.',
  category: categoryId,
  price: '245',
  meta: {
    currency: 'USD',
  },
  productImage: 'https://i.pcmag.com/imagery/roundups/04OtgLS2CSnpQsNfHODkh5S-1..v1569470764.jpg',
};

export const userPayload = {
  _id: userId,
  email: 'admin@test.com',
  password: hashPassword('p@ssword'),
};

xdescribe('product', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('get product route', () => {
    describe('given the product does not exist', () => {
      it('should return a 404', async () => {
        const productId = 'product-123';

        await supertest(app).get(`/products/${productId}`).expect(400);
      });
    });
  });

  describe('create product route', () => {
    describe('given the user is not logged in', () => {
      it('should return a 403', async () => {
        const { statusCode } = await supertest(app).post('/products');

        expect(statusCode).toBe(401);
      });
    });
  });
});