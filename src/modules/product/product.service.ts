import Product from '../../db/models/products';
// import { getPaginatedRecords } from '@helpers/paginate';
import { AddProductInterface, GetProductInterface } from './product.interface';

export const getAllProducts = async () => {
  try {
    const products = await Product.find();

    return {
      error: false,
      message: 'Products fetched successfully',
      data: products,
    };
  } catch (err) {
    console.log(err);
    return {
      error: true,
      message: (err as any).message,
      data: null,
    };
  }
};

export const createProduct = async (data: AddProductInterface) => {
  try {
    const newProduct = {
      name: data.name,
      description: data?.description,
      categoryId: data.categoryId,
      productImage: data.productImage,
      price: data.price,
    };

    const productInstance = new Product(newProduct);

    const product = await productInstance.save();

    return {
      error: false,
      message: 'Product added successfully.',
      data: product,
    };
  } catch (err) {
    console.log(err);
    return {
      error: true,
      message: (err as any).message,
      data: null,
    };
  }
};

export const getProductById = async (data: GetProductInterface) => {
  try {
    const product = await Product.findById(data.productId);
    if (!product) {
      return {
        error: true,
        message: `Product with id: ${data.productId} doesn't exist`,
        data: null,
      };
    }

    return {
      error: false,
      message: 'Product fetched successfully',
      data: product,
    };
  } catch (err) {
    console.log(err);
    return {
      error: true,
      message: (err as any).message,
      data: null,
    };
  }
};

export const updateProductById = async (data: AddProductInterface) => {
  try {
    const isUpdated = await Product.findByIdAndUpdate(data.productId, data);

    if (!isUpdated) {
      return {
        error: true,
        message: "Product doesn't exist",
        data: null,
      };
    }

    return {
      error: false,
      message: 'Product updated successfully',
      data: null,
    };
  } catch (err) {
    return {
      error: true,
      message: (err as any).message,
      data: null,
    };
  }
};
export const deleteProductById = async (data: GetProductInterface) => {
  try {
    const isDeleted = await Product.findByIdAndDelete(data.productId);

    if (!isDeleted) {
      return {
        error: true,
        message: "Product doesn't exist",
        data: null,
      };
    }

    return {
      error: false,
      message: 'Product deleted successfully',
      data: null,
    };
  } catch (err) {
    return {
      error: true,
      message: (err as any).message,
      data: null,
    };
  }
};
