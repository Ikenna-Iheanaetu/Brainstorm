import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  percentage: 0,
};

const quizResultSlice = createSlice({
  name: "quizResult",
  initialState,
  reducers: {
    updateQuizResult: (state, action) => {
      const { score, correctAnswers, wrongAnswers } = action.payload;

      console.log(action.payload)

      state.score = score;
      state.correctAnswers = correctAnswers;
      state.wrongAnswers = wrongAnswers;

      // Calculate the percentage
      const totalQuestions = correctAnswers + wrongAnswers;
      state.percentage =
        totalQuestions === 0 ? 0 : (correctAnswers / totalQuestions) * 100;
    },
  },
});

export const { updateQuizResult } = quizResultSlice.actions;

export default quizResultSlice.reducer;
