import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  quizLength: null,
};

const takenQuizSlice = createSlice({
  name: "takenQuiz",
  initialState,
  reducers: {
    setQuizQuestions: (state, action) => {
      const { questions } = action.payload;
      state.questions = questions;
      state.quizLength = questions.length
    },
  },
});

export const { setQuizQuestions } = takenQuizSlice.actions;

export default takenQuizSlice.reducer;
