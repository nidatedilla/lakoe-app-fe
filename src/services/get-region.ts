import { useQuery } from '@tanstack/react-query';
import { Api } from '../libs/api';
import { Region, Village } from '../types/type-region';

export function useFindProvince() {
  return useQuery<Region[]>({
    queryKey: ['provinces'],
    queryFn: async () => {
      const res = await Api.get('/wilayah/provinces');
      console.log('data provinsi: ', res.data.data);
      return res.data.data;
    },
  });
}

export function useFindRegencies(provinceCode: string) {
  return useQuery<Region[]>({
    queryKey: ['regencies', provinceCode],
    queryFn: async () => {
      const res = await Api.get(`/wilayah/regencies/${provinceCode}`);
      console.log('data Kabupaten / Kota: ', res.data.data);
      return res.data.data;
    },
  });
}

export function useFindDistricts(regencieCode: string) {
  return useQuery<Region[]>({
    queryKey: ['districts', regencieCode],
    queryFn: async () => {
      const res = await Api.get(`/wilayah/districts/${regencieCode}`);
      console.log('data Kecamatan: ', res.data.data);
      return res.data.data;
    },
  });
}

export function useFindVillages(districtsCode: string) {
  return useQuery<Village[]>({
    queryKey: ['villages', districtsCode],
    queryFn: async () => {
      const res = await Api.get(`/wilayah/villages/${districtsCode}`);
      console.log('data Kelurahan: ', res.data.data);
      return res.data.data;
    },
  });
}