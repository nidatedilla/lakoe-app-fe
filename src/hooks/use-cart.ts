import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Item } from '../types/type-product';

interface CartItem {
  id: string;
  name: string;
  attachments: string;
  price: number;
  quantity: number;
  stock: number;
  variant?: {
    id: string;
    combination: Record<string, string>;
    stock: number;
  };
}

const getCart = (): CartItem[] => {
  return JSON.parse(localStorage.getItem('cart') || '[]').map((item: Item) => ({
    ...item,
    variant:
      typeof item.variant === 'string'
        ? JSON.parse(item.variant)
        : item.variant,
  }));
};

const setCart = (cart: CartItem[]) => {
  localStorage.setItem(
    'cart',
    JSON.stringify(
      cart.map((item) => ({
        ...item,
        variant: item.variant ?? undefined,
      }))
    )
  );
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
          cart.push({
            ...newItem,
            variant: newItem.variant ?? undefined,
          });
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
    mutationFn: ({
      id,
      quantity,
      variant,
    }: {
      id: string;
      quantity: number;
      variant?: CartItem['variant'];
    }) => {
      return new Promise<void>((resolve) => {
        const cart = getCart().map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  quantity !== undefined
                    ? Math.max(1, quantity)
                    : item.quantity,
                variant: variant ?? item.variant,
              }
            : item
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
