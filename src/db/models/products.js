import { model, Schema as _Schema } from 'mongoose';

const productSchema = _Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    // categoryId: { type: _Schema.Types.ObjectId, ref: 'Category', required: true },

    productImage: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = model('Product', productSchema);
export default Product;
