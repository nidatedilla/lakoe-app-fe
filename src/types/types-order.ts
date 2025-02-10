export type Order = {
  id: string;
  status: string;
  code: string;
  date: string;
  buyer: {
    id: string;
    name: string;
    phone: number;
  };
  store: {
    id: string;
    name: string;
  };
  product: {
    id: string;
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

export type orderTypes = {
  id: string;
  order_number: string;
  userId: string;
  storeId: string;
  total_price: number;
  discount?: number | null;
  status: string;
  payment_status: string;
  payment_method?: string;
  shipper_contact_name: string;
  shipper_contact_phone: string;
  shipper_contact_email?: string;
  shipper_organization?: string;
  origin_contact_name: string;
  origin_contact_phone: string;
  origin_address: string;
  origin_postal_code: string;
  destination_contact_name: string;
  destination_contact_phone: string;
  destination_address: string;
  destination_postal_code: string;
  courierId?: string | null;
  tracking_number?: string | null;
  order_note?: string | null;
  store: {
    id: string;
    name: string;
  };
  order_items: {
    id: string;
    orderId: string;
    productId: string;
    qty: number;
    price: number;
    weight: number;
    height: number;
    length: number;
    width: number;
    product: {
      id: string;
      name: string;
      description: string;
      attachments: string;
      is_active: boolean;
      url: string;
      minimum_order: number;
      price: number;
      sku: string;
      stock: number;
      weight: number;
      size: number;
      categories: {
        id: string;
        name: string;
      }[];
      variant: {
        id: string;
        name: string;
        price: number;
      }[];
    };
  }[];
  courier: {
    id: string;
    courier_company: string;
    price: number;
  };
  created_at: string;
  updated_at: string;
};
