"use client";

import { configureStore } from "@reduxjs/toolkit";
import quizFormSlice from "./slice/quizFormSlice";

export const store = configureStore({
  reducer: {
    quizForm: quizFormSlice,
  },
});
