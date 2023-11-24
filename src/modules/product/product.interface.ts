export interface AddProductInterface {
  name: string;
  description: string;
  categoryId: number;
  productImage: string;
  price: number;
}
export interface GetProductsInterface {
  page: number;
  limit: number;
}
