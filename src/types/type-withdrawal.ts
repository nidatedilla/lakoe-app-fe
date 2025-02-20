import { stores, User } from "./type-user";

export interface Withdrawal {
  id: string;
  sellerId: string;
  status: string;
  storeId: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  seller: User;
  store: stores;
}

export interface WithdrawalSeller {
  id?: string;
  sellerId: string;
  storeId: string;
  amount: number;
}