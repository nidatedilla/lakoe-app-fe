// Define the type for the order details
export type Order = {
  id: number;
  status: string;
  kode: string;
  pembeli: string;
  tanggal: string;
  product: {
    nama: string;
    jumlah: number;
    harga: number;
    gambar: string;
  };
  pengiriman: {
    kurir: string;
    resi: string;
    alamat: string;
  };
  rincian: {
    totalBarang: number;
    totalHarga: number;
    ongkosKirim: number;
    berat: number;
    diskon: number;
    biayaLayanan: number;
    totalPenjualan: number;
  };
};
