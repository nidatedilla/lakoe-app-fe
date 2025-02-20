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

export type Item = {
  name: string;
  description: string;
  value: number;
  weight: number;
  quantity: number;
  variant?: {
    id: string;
    combination: Record<string, string>;
    stock: number;
  };
};
