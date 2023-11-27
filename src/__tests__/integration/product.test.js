import request from 'supertest';
import mongoose from 'mongoose';
import Product from '@db/models/products';
import app from '../../app';
import { createUserAndSave, loginUserAndGetToken, createCategoryAndSave, DB_URL } from '../fixtures';

const productData = {
  name: 'hp laptop ',
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  category: '6561b8847ce833d61b69bcdd',
  price: '245',
  productImage: 'https://i.pcmag.com/imagery/roundups/04OtgLS2CSnpQsNfHODkh5S-1..v1569470764.jpg',
};

describe('Product API', () => {
  let token;
  let testCategory;
  let testProduct;
  beforeAll(async () => {
    await mongoose.connect(DB_URL);
    await createUserAndSave();

    token = await loginUserAndGetToken();

    testCategory = await createCategoryAndSave();
    testProduct = await new Product({
      ...productData,
      category: testCategory._id,
    }).save();
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('Get Product By Id', () => {
    it('should get a product by ID', async () => {
      const response = await request(app).get(`/products/${testProduct._id}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Product fetched successfully');
    });

    it('should handle non-existent product ID', async () => {
      const response = await request(app).get('/products/6563041ed704a3fecb42013e');

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Product with id: 6563041ed704a3fecb42013e doesn't exist");
      expect(response.body.data).toBeNull();
    });
  });
  describe('Get All Products', () => {
    it('should get all products', async () => {
      const response = await request(app).get('/products?limit=2&page=1');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Products fetched successfully');
    });
  });
  describe('Create Product', () => {
    it('should create product', async () => {
      const response = await request(app).post('/products').set('Authorization', `Bearer ${token}`).send(productData);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Product added successfully.');
    });
    it('should fail to create product with invalid category', async () => {
      const response = await request(app)
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...productData, category: '' });

      expect(response.status).toBe(422);
      expect(response.body.message).toBe('validation failed');
    });
  });
  describe('Update Product By Id', () => {
    it('should update product by Id', async () => {
      const response = await request(app)
        .patch(`/products/${testProduct._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ ...productData, name: 'MacBook Pro' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Product updated successfully');
    });
  });
  describe('Delete Product By Id', () => {
    it('should delete product by Id', async () => {
      const response = await request(app)
        .delete(`/products/${testProduct._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Product deleted successfully');
    });
  });
});
