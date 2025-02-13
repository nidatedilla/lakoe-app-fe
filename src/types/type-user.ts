import { product } from './type-product';
import { Location } from './type-location';
export interface User {
  id: string;
  email: string;
  role: string;
  name: string;
  phone: string;
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
  locations?: Location[]
  _count: {
    products: number;
  };
}
