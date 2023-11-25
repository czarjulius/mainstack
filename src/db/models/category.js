import { model, Schema as _Schema } from 'mongoose';

const categorySchema = _Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Category = model('Category', categorySchema);

export default Category;
