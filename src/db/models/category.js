const mongoose = require('mongoose');

const { model, Schema } = mongoose;

const categorySchema = Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const Category = model('Category', categorySchema);

module.exports = Category;
