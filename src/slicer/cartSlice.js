import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        count: 0,
        items: []
    },
    reducers: {
        incrementCart: (state) => {
            state.count += 1
        },
        decrementCart: (state) => {
            state.count -= 1
        },
        setCartCount: (state, action) => {
            state.count = action.payload
        }
    }
})

export const { incrementCart, decrementCart, setCartCount } = cartSlice.actions

export const cartItems = (state) => state.cart.count

export default cartSlice.reducer