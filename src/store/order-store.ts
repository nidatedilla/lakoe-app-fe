import { create } from 'zustand';
import { Order } from 'types/types-order';

type OrderState = {
  orders: Order[];
  loading: boolean;
  setOrders: (orders: Order[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  loading: false,
  setOrders: (orders) => set({ orders }),
  setLoading: (loading) => set({ loading }),
}));
