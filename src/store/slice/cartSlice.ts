import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { IProduct } from "../../types/IProduct"

export interface CartItem {
  product: IProduct
  quantity: number
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<IProduct>) {
      const existing = state.items.find((i) => i.product.id === action.payload.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ product: action.payload, quantity: 1 })
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.product.id !== action.payload)
    },
    incrementQuantity(state, action: PayloadAction<number>) {
      const existing = state.items.find((i) => i.product.id === action.payload)
      if (existing) {
        existing.quantity += 1
      }
    },
    decrementQuantity(state, action: PayloadAction<number>) {
      const existing = state.items.find((i) => i.product.id === action.payload)
      if (existing) {
        existing.quantity -= 1
        if (existing.quantity <= 0) {
          state.items = state.items.filter((i) => i.product.id !== action.payload)
        }
      }
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer
