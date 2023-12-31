import { Schema, model, models } from "mongoose";

const quizSchema = new Schema({
  quizName: {
    type: String,
    required: true,
  },
  quizDesc: {
    type: String,
    required: true,
  },
  quizQuestions: {
    type: [Array],
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  results: [
    {
      quizTakerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      result: {
        type: [Array],
      },
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Quiz = models.Quiz || model("Quiz", quizSchema);

export default Quiz;
