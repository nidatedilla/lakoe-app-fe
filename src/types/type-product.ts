export interface product {
  id: string;
  name: string;
  description: string;
  size: number;
  minimum_order: number;
  attachments: string;
  storeId: string;
  sku: string;
  is_active: boolean;
  categoryId: string;
  stock: number;
  price: number;
  weight: number;
}
