// quizFormSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizName: "",
  quizDesc: "",
  questions: [],
  currentQuestion: "",
  currentOptions: [""],
  correctOption: 0,
};

const quizFormSlice = createSlice({
  name: "quizForm",
  initialState,
  reducers: {
    setQuizName: (state, action) => {
      state.quizName = action.payload;
    },
    setQuizDesc: (state, action) => {
      state.quizDesc = action.payload;
    },
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    addOption: (state, action) => {
      const { questionId, option } = action.payload;
      
      const question = state.questions.find((q) => q.id === questionId);
      if (question) {
        question.options.push(option);
      }
    },
    clearForm: (state) => {
      state.currentQuestion = "";
      state.currentOptions = [""];
      state.correctOption = 0;
    },
    deleteQuestion: (state, action) => {
      state.questions = state.questions.filter((q) => q.id !== action.payload.id);
    },
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    setCorrectOption: (state, action) => {
      state.correctOption = action.payload;
    },
    setCurrentOptions: (state, action) => {
      const { optionIndex, option } = action.payload;
      state.currentOptions[optionIndex] = option;
    },
  },
});

export const {
  setQuizName,
  setQuizDesc,
  addQuestion,
  addOption,
  clearForm,
  deleteQuestion,
  setCurrentQuestion,
  setCorrectOption,
  setCurrentOptions,
} = quizFormSlice.actions;

export default quizFormSlice.reducer;
