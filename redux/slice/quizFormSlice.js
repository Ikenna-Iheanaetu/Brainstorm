import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizName: "",
  quizDesc: "",
  questions: [],
  options: [""],
  currentQuestion: "",
  correctOption: 0,
  previewData: {
    question: "",
    options: [],
    correctOption: null,
  },
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
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    setCorrectOption: (state, action) => {
      state.correctOption = action.payload;
    },
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    addOption: (state, action) => {
      const { optionIndex, optionText } = action.payload;
      // Ensure that the options array is long enough
      while (state.options.length <= optionIndex) {
        state.options.push("");
      }
      state.options[optionIndex] = optionText;
    },
    updatePreviewData: (state, action) => {
      const { questionIndex, updatedQuestionData } = action.payload;
      if (state.questions[questionIndex]) {
        state.questions[questionIndex] = {
          ...state.questions[questionIndex],
          ...updatedQuestionData,
        };
      }
    },
    clearForm: (state) => {
      state.currentQuestion = "";
      state.options = [""];
      state.correctOption = 0;
    },
    clearQuestions: (state) => {
      state.quizName = '';
      state.quizDesc = '';
      state.questions = [];
    },
    deleteQuestion: (state, action) => {
      const { questionIndex } = action.payload;
      state.questions.splice(questionIndex, 1);
    },
    deleteOption: (state, action) => {
      const optionIndex = action.payload;
      state.options.splice(optionIndex, 1);
      // Update the correctOption index if it's greater than the deleted option index
      if (state.correctOption > optionIndex) {
        state.correctOption -= 1;
      }
    },
  },
});

export const {
  questions,
  setQuizName,
  setQuizDesc,
  setCurrentQuestion,
  setCorrectOption,
  addQuestion,
  addOption,
  updatePreviewData,
  previewData,
  clearForm,
  clearQuestions,
  deleteQuestion,
  deleteOption,
} = quizFormSlice.actions;

export default quizFormSlice.reducer;
