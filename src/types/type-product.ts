export interface product {
  id: string;
  name: string;
  description: string;
  size: number;
  slug: string;
  minimum_order: number;
  attachments: string;
  storeId: string;
  sku: string;
  length: number;
  width: number;
  height: number;
  is_active: boolean;
  categoryId: string;
  stock: number;
  storeDomain?: string;
  price: number;
  weight: number;
  // Tambahkan properti variant untuk menampung array varian (opsional)
  variant?: variant[];
}

export interface variant {
  id: string;
  // Jika data kombinasi disimpan sebagai JSON, bisa menggunakan Record<string, string> atau tipe lain sesuai kebutuhan
  combination: Record<string, string>;
  price: number;
  sku?: string; // properti ini opsional
  stock: number;
  weight: number;
  photo?: string;
  productId: string;
  order_itemsId?: string; // properti ini opsional, sesuai skema Prisma
}

export type Item = {
  name: string;
  description: string;
  value: number;
  length: number;
  width: number;
  height: number;
  weight: number;
  quantity: number;
};
