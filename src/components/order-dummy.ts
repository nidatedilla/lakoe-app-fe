import { Order } from '../types/types-order';

export const orderDummy: Order[] = [
  {
    id: '1',
    status: 'Pesanan Baru',
    code: 'INV/356364767/FHD/74378',
    date: '23 Januari 2025-19:43 WIB',
    buyer: {
      id: '1',
      name: 'Nida',
      phone: 6281381789452,
    },
    store: {
      id: '1',
      name: 'Nida Store',
    },
    product: {
      id: '1',
      name: 'TAS RANSEL WANITA',
      quantity: 1,
      price: 150000,
      image:
        'https://dynamic.zacdn.com/QgEV1TUOsw_EeB1_-sNLHhaDpv0=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/gykaco-4560-3988114-1.jpg',
    },
    shipping: {
      courier: 'J&T',
      trackingNumber: '-',
      address: 'Tangerang',
    },
    details: {
      totalItems: 1,
      totalPrice: 150000,
      shippingCost: 20000,
      weight: 1,
      discount: 0,
      serviceFee: 5000,
      totalAmount: 175000,
    },
  },
  {
    id: '2',
    status: 'Siap Dikirim',
    code: 'INV/356364768/FHD/74379',
    date: '23 Januari 2025-19:43 WIB',
    buyer: {
      id: '2',
      name: 'Tedilla',
      phone: 6281381789452,
    },
    store: {
      id: '1',
      name: 'Nida Store',
    },
    product: {
      id: '2',
      name: 'TAS RANSEL SEKOLAH ANAK WANITA',
      quantity: 3,
      price: 300000,
      image:
        'https://dynamic.zacdn.com/CCB1kSzVzPUvvaMlNgG4o4X3ehM=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/hamlin-2576-4056183-1.jpg',
    },
    shipping: {
      courier: 'J&T',
      trackingNumber: '-',
      address: 'Jakarta',
    },
    details: {
      totalItems: 3,
      totalPrice: 900000,
      shippingCost: 30000,
      weight: 3,
      discount: 50000,
      serviceFee: 10000,
      totalAmount: 890000,
    },
  },
  {
    id: '3',
    status: 'Pesanan Selesai',
    code: 'INV/356364769/FHD/74380',
    date: '23 Januari 2025-19:43 WIB',
    buyer: {
      id: '2',
      name: 'Farhan',
      phone: 6285714673634,
    },
    store: {
      id: '1',
      name: 'Nida Store',
    },
    product: {
      id: '3',
      name: 'TAS SELEMPANG WANITA',
      quantity: 2,
      price: 100000,
      image:
        'https://silvertote.com/cdn/shop/files/IMG_9026_1024x1024@2x.jpg?v=1684915118',
    },
    shipping: {
      courier: 'J&T',
      trackingNumber: '-',
      address: 'Tangerang',
    },
    details: {
      totalItems: 2,
      totalPrice: 200000,
      shippingCost: 25000,
      weight: 2,
      discount: 10000,
      serviceFee: 7000,
      totalAmount: 222000,
    },
  },
];
