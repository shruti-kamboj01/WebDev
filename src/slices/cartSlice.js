import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


const initialState = {
    // totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0
    totalItems: Cookies.get("totalItems")
};

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers: {
        setTotalItems(state, value) {
            state.totalItems = value.payload;
        },
        //add to cart
        //removefromCart
        //resetCart
    },
})

export const {setTotalItems} = cartSlice.actions;
export default cartSlice.reducer;