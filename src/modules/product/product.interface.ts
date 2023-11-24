export interface AddProductInterface {
  productId?: number;
  name: string;
  description: string;
  categoryId: number;
  merchantId: number;
  subCategoryId: number;
  productImage: string;
  qtyInStock: number;
  price: number;
  type: string;
  meta: {
    warranty: number;
    memorySize: number;
    color: string;
    currency: string;
    tags: string[];
    images: string[];
    productSummary: string;
  };
}
export interface GetProductsInterface {
  name: string;
  page: number;
  min: number;
  max: number;
  categoryId: number;
  categoryName: string;
  merchantId: number;
  subCategoryId: number;
  limit: number;
  id: number;
  type: string;
  color: any;
  memorySize: any;
  searchKeyword: string;
}

export interface GetPopularProductInterface {
  limit: number;
  categoryName: string;
}
export interface GetProductInterface {
  productId: number;
}
export interface DeleteProductInterface {
  productId: number;
}
export interface ArchiveProductInterface {
  productId: number;
}
