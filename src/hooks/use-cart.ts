import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface CartItem {
  id: string;
  name: string;
  attachments: string;
  price: number;
  quantity: number;
  stock: number;
}

const getCart = (): CartItem[] => {
  return JSON.parse(localStorage.getItem('cart') || '[]');
};

const setCart = (cart: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('storage'));
};

export const useCart = () => {
  return useQuery({ queryKey: ['cart'], queryFn: getCart });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newItem: CartItem) => {
      return new Promise<void>((resolve) => {
        const cart = getCart();
        const existingItem = cart.find((item) => item.id === newItem.id);
        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          cart.push(newItem);
        }
        setCart(cart);
        resolve();
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      return new Promise<void>((resolve) => {
        const cart = getCart().filter((item) => item.id !== id);
        setCart(cart);
        resolve();
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) => {
      return new Promise<void>((resolve) => {
        const cart = getCart().map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
        setCart(cart);
        resolve();
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
