
import { create } from 'zustand';
import getProducts from '../services/products-services';
import { Product } from '../types/types';


interface ProductState {
  products: Product[];
  cart: Product[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  sortBy: string;
  keyword: string;
  fetchProducts: (keyword: string, page?: number, sortBy?: string) => Promise<void>;
  addItemToCart: (product: Product) => void;
  loadMoreProducts: (keyword: string, page: number, sortBy: string) => void;
  removeItemFromCart: (productId: string) => void;
}

const useProductStore = create<ProductState>((set) => ({
  cart: [],
  products: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  sortBy: 'best_match',
  keyword: '',


  fetchProducts: async (keyword: string, page = 1, sortBy = 'best_match') => {
    set({ loading: true, error: null });

    try {
      const data = await getProducts(keyword, page, sortBy);
      console.log('Data:', data);
      set({
        products: data.products,
        total: data.total,
        page,
        sortBy,
        loading: false,
        keyword: keyword,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'error al obtener productos',
        loading: false,
      });
    }
  },

  loadMoreProducts: async (keyword: string, page: number, sortBy: string) => {
    set({ loading: true });

    try {
      const data = await getProducts(keyword, page, sortBy);
      set((state) => ({
        products: [...state.products, ...data.products],
        total: data.total,
        page,
        sortBy,
        loading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'error al obtener productos',
        loading: false,
      });
    }
  },

  addItemToCart: (product) => {
    set((state) => {
      const cartItems = [...state.cart, product]
      const newProducts = state.products.filter((p) => p.id !== product.id);
      return {
        cart: cartItems,
        products: newProducts,
      }
    });
  },
  removeItemFromCart: (productId) => {
    set((state) => ({
      products: state.products.map((p) => (p.id === productId ? { ...p, inCart: false } : p)),
    }));
  }
}));

export default useProductStore;