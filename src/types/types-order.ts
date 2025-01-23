export type Order = {
  id: number;
  status: string;
  code: string;
  buyer: string;
  date: string;
  product: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  };
  shipping: {
    courier: string;
    trackingNumber: string;
    address: string;
  };
  details: {
    totalItems: number;
    totalPrice: number;
    shippingCost: number;
    weight: number;
    discount: number;
    serviceFee: number;
    totalAmount: number;
  };
};
