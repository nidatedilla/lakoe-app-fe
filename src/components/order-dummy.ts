import { Order } from '../types/types-order';

export const orderDummy: Order[] = [
  {
    id: 1,
    status: 'Pesanan Baru',
    kode: 'INV/356364767/FHD/74378',
    pembeli: 'Nida',
    tanggal: '23 Januari 2025-19:43 WIB',
    produk: {
      nama: 'TAS RANSEL WANITA',
      jumlah: 1,
      harga: 150000,
      gambar:
        'https://dynamic.zacdn.com/QgEV1TUOsw_EeB1_-sNLHhaDpv0=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/gykaco-4560-3988114-1.jpg',
    },
    pengiriman: {
      kurir: 'J&T-Regular',
      resi: '-',
      alamat: 'Tangerang',
    },
    rincian: {
      totalBarang: 1,
      totalHarga: 150000,
      ongkosKirim: 20000,
      berat: 1,
      diskon: 0,
      biayaLayanan: 5000,
      totalPenjualan: 175000,
    },
  },
  {
    id: 2,
    status: 'Siap Dikirim',
    kode: 'INV/356364768/FHD/74379',
    pembeli: 'Tedilla',
    tanggal: '23 Januari 2025-19:43 WIB',
    produk: {
      nama: 'TAS RANSEL SEKOLAH ANAK WANITA',
      jumlah: 3,
      harga: 300000,
      gambar:
        'https://dynamic.zacdn.com/CCB1kSzVzPUvvaMlNgG4o4X3ehM=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/hamlin-2576-4056183-1.jpg',
    },
    pengiriman: {
      kurir: 'J&T-Express',
      resi: '-',
      alamat: 'Jakarta',
    },
    rincian: {
      totalBarang: 3,
      totalHarga: 900000,
      ongkosKirim: 30000,
      berat: 3,
      diskon: 50000,
      biayaLayanan: 10000,
      totalPenjualan: 890000,
    },
  },
  {
    id: 3,
    status: 'Pesanan Selesai',
    kode: 'INV/356364769/FHD/74380',
    pembeli: 'Manuar',
    tanggal: '23 Januari 2025-19:43 WIB',
    produk: {
      nama: 'TAS SELEMPANG WANITA',
      jumlah: 2,
      harga: 100000,
      gambar:
        'https://silvertote.com/cdn/shop/files/IMG_9026_1024x1024@2x.jpg?v=1684915118',
    },
    pengiriman: {
      kurir: 'JNE-Regular',
      resi: '-',
      alamat: 'Tangerang',
    },
    rincian: {
      totalBarang: 2,
      totalHarga: 200000,
      ongkosKirim: 25000,
      berat: 2,
      diskon: 10000,
      biayaLayanan: 7000,
      totalPenjualan: 222000,
    },
  },
];
