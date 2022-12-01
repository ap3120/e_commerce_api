import {createSlice} from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        total_price: 0,
        products_list: []
    },
    reducers: {
        addToCart (state, action) {
            state.products_list.push(action.payload.product);
            state.total_price = state.total_price + action.payload.price;
        },
        removeFromCart (state, action) {
            let i = state.products_list.length - 1;
            while(state.products_list[i].product_id !== action.payload.product.product_id && i > -1) {
                i = i - 1;
            }
            const newArr = state.products_list.splice(0, i).concat(state.products_list.splice(1, state.products_list.length));
            state.products_list = newArr;
            state.total_price = state.total_price - action.payload.price;
        },
        deleteCart (state, action) {
            state.total_price = 0;
            state.products_list = [];
        }
    }
})

export const {addToCart, removeFromCart, deleteCart} = cartSlice.actions;

export default cartSlice.reducer;
