"use client";

import { configureStore } from "@reduxjs/toolkit";
import { brainStormApi } from "./query";
import quizFormSlice from "./slice/quizFormSlice";

export const store = configureStore({
  reducer: {
    // auth: authSlice,
    
    quizForm: quizFormSlice,
    [brainStormApi.reducerPath]: brainStormApi.reducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(brainStormApi.middleware),
});
