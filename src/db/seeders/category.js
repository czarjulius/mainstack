const mongoose = require('mongoose');
const Category = require('../models/category');

mongoose
  .connect('mongodb://localhost:27017/mainstack')
  .then(() => {
    console.log('Mongo Connection Open');
  })
  .catch((error) => {
    console.log(error);
  });

const seedCategories = [{ name: 'laptops' }, { name: 'phones' }, { name: 'tablets' }, { name: 'games' }];

const seedDB = async () => {
  await Category.deleteMany({});
  await Category.insertMany(seedCategories);
};

seedDB().then(() => {
  mongoose.connection.close();
});
