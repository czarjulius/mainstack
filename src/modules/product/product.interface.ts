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
  category: string;
  productId: string;
  price: number;
}

export interface GetProductInterface {
  productId: string;
}
