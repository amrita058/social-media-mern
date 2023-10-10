import { configureStore } from "@reduxjs/toolkit";
import allSlice from "../features/slice";

export const store = configureStore({
    reducer:{
        auth:allSlice.auth,
        theme:allSlice.theme,
        drop:allSlice.drop
    }
})