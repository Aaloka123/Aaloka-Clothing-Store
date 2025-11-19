import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AdminProduct {
  id: string;
  name: string;
  price: number;
  img: string;
  category: string;
  stock: number;
  description: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface AdminProductsState {
  products: AdminProduct[];
}

const initialState: AdminProductsState = {
  products: [],
};

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<AdminProduct[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<AdminProduct>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<AdminProduct>) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
});

export const { setProducts, addProduct, updateProduct, deleteProduct } =
  adminProductSlice.actions;

export default adminProductSlice.reducer;
