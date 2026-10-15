import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import prodSlice from "./prodSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        prod: prodSlice
    }
})

export default store
