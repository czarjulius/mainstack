import Category from '../../db/models/category';
import { AddCategoryInterface } from './category.interface';

export const createCategory = async (data: AddCategoryInterface) => {
  try {
    const existingEntity = await Category.findOne({
      name: data.name,
    });
    if (existingEntity) {
      throw new Error('Category with this name already exists');
    }
    const newCategory = new Category({ name: data.name });

    const category = await newCategory.save();
    return {
      error: false,
      message: 'Category added successfully.',
      data: category,
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
