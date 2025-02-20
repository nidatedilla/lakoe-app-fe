import { product } from './type-product';
import { Location } from './type-location';
export interface User {
  id: string;
  email: string;
  role: string;
  name: string;
  phone: string;
  balance: number;
  profile?: {
    id: String;
    image: String;
    userId: String;
  };
  stores?: stores;
}

export interface stores {
  id?: string;
  name?: string;
  description?: string;
  banner?: string;
  logo?: string;
  slogan?: string;
  products?: product[];
  locations?: Location[];
  _count: {
    products: number;
  };
  bank_accounts?: Bank;
}

export interface Bank {
  acc_name: string
  acc_num : string
  bank: string
  id?: string
  userId : string
  storeId:string
}
