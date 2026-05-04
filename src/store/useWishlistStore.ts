import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../services/product.service';

interface WishlistState {
  items: Product[];
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      toggleItem: (product) => {
        const currentItems = get().items;
        const exists = currentItems.find(item => item.id === product.id);
        
        if (exists) {
          set({ items: currentItems.filter(item => item.id !== product.id) });
        } else {
          set({ items: [...currentItems, product] });
        }
      },
      
      isInWishlist: (productId) => {
        return get().items.some(item => item.id === productId);
      },
      
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'furnova-wishlist',
    }
  )
);
