"use client";

import { configureStore } from "@reduxjs/toolkit";
import quizFormSlice from "./slice/quizFormSlice";
import takenQuizSlice from "./slice/takenQuizSlice";
import quizResultSlice from "./slice/quizResultSlice";

export const store = configureStore({
  reducer: {
    quizForm: quizFormSlice,
    takenQuiz: takenQuizSlice,
    quizResult: quizResultSlice,
  },
});
