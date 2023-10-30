import { configureStore } from "@reduxjs/toolkit";
import allSlice from "../features/slice";

export const store = configureStore({
    reducer:{
        auth:allSlice.auth,
        theme:allSlice.theme,
        drop:allSlice.drop,
        notify:allSlice.notify,
        user:allSlice.user,
        postInfo:allSlice.postInfo,
        query:allSlice.query,
        post:allSlice.post
    }
})