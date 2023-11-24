import Product from '../../db/models/products';
// import { getPaginatedRecords } from '@helpers/paginate';
import { AddProductInterface } from './product.interface';

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

// export const getProduct = async (data: GetProductInterface) => {
//   try {
//     const product = await Product.findOne({
//       where: {
//         id: data.productId,
//       },
//       include: [
//         {
//           model: Merchant,
//           attributes: ["merchantName"],
//         },
//         {
//           model: Category,
//           attributes: ["name"],
//         },
//         {
//           model: SubCategory,
//           attributes: ["name"],
//         },
//       ],
//       raw: true,
//       attributes: [
//         "id",
//         "name",
//         "description",
//         "price",
//         "productImage",
//         "merchantId",
//         "qtyInStock",
//         "categoryId",
//         "subCategoryId",
//         "type",
//         "meta",
//         "createdAt",
//       ],
//     });
//     if (!product) {
//       return {
//         error: true,
//         message: `Product with id: ${data.productId} doesn't exist`,
//         data: null,
//       };
//     }

//     return {
//       error: false,
//       message: "Product fetched successfully",
//       data: {
//         id: product.id,
//         name: product.name,
//         description: product.description,
//         price: product.price,
//         productImage: product.productImage,
//         qtyInStock: product.qtyInStock,
//         subCategoryId: product.subCategoryId,
//         categoryId: product.categoryId,
//         type: product.type,
//         meta: product.meta,
//         category: product["Category.name"],
//         merchant: product["Merchant.merchantName"],
//         merchantId: product.merchantId,
//         subCategory: product["SubCategory.name"],
//       } as any,
//     };
//   } catch (err) {
//     console.log(err);
//     return {
//       error: true,
//       message: (err as any).message,
//       data: null,
//     };
//   }
// };

// export const updateProductById = async (data: AddProductInterface) => {
//   try {
//     const [isUpdated] = await editEntity(
//       Product,
//       { id: data.productId },
//       { ...data }
//     );

//     if (!isUpdated) {
//       return {
//         error: true,
//         message: "Product doesn't exist",
//         data: null,
//       };
//     }

//     return {
//       error: false,
//       message: "Product updated successfully",
//       data: null,
//     };
//   } catch (err) {
//     return {
//       error: true,
//       message: (err as any).message,
//       data: null,
//     };
//   }
// };

// export const deleteProduct = async (data: DeleteProductInterface) => {
//   try {
//     const product = await OrderItem.findOne({
//       where: {
//         productId: data.productId,
//       },
//       raw: true,
//     });

//     if (product) {
//       return {
//         error: true,
//         message: "This product can only be edited!",
//         data: null,
//       };
//     }

//     const isDeleted = await Product.destroy({
//       where: {
//         id: data.productId,
//       },
//     });

//     if (!isDeleted) {
//       return {
//         error: true,
//         message: "Product doesn't exist",
//         data: null,
//       };
//     }

//     return {
//       error: false,
//       message: "Product deleted successfully",
//       data: null,
//     };
//   } catch (err) {
//     return {
//       error: true,
//       message: (err as any).message,
//       data: null,
//     };
//   }
// };
