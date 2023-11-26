export interface AddProductInterface {
  name: string;
  description: string;
  category: string;
  productImage: string;
  price: number;
  productId?: string;
}
export interface GetProductsInterface {
  page: number;
  limit: number;
  name: string;
}

export interface GetProductInterface {
  productId: string;
}
