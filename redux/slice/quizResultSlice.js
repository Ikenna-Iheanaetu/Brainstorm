// quizResultSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
};

const quizResultSlice = createSlice({
  name: "quizResult",
  initialState,
  reducers: {
    updateQuizResult: (state, action) => {
      // This reducer updates the quiz result based on the action payload.
      // You can define your logic here to update the result.
      state.score = action.payload.score;
      state.correctAnswers = action.payload.correctAnswers;
      state.wrongAnswers = action.payload.wrongAnswers;
    },
  },
});

export const { updateQuizResult } = quizResultSlice.actions;

export default quizResultSlice.reducer;


// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { useSelector, useDispatch } from "react-redux";
// import { setQuizQuestions } from "@/redux/slice/takenQuizSlice";
// import { updateQuizResult } from "@/redux/slice/quizResultSlice"; // Assuming you have a separate Redux slice for quiz results.

// export default function Page() {
//   const [quizName, setQuizName] = useState("");
//   const [quizTrack, setQuizTrack] = useState({
//     activeQuestion: 0,
//     selectedAnswer: "",
//     checked: false,
//     selectedAnswerIndex: null,
//     showResult: false,
//   });
//   const [result, setResult] = useState({
//     score: 0,
//     correctAnswers: 0,
//     wrongAnswers: 0,
//   });

//   const quiz = useSelector((state) => state.takenQuiz);
//   const dispatch = useDispatch();
//   const searchParams = useSearchParams();
//   const quizId = searchParams.get("id");

//   const { questions, quizLength } = quiz;
//   const currentQuestion = questions[quizTrack.activeQuestion];

//   useEffect(() => {
//     async function getQuiz() {
//       const response = await fetch(`/api/quiz/${quizId}`).then((res) => res.json());

//       if (response) {
//         const quizData = response.data;
//         dispatch(setQuizQuestions({ questions: quizData.quizQuestions }));
//         setQuizName(quizData.quizName);
//       }
//     }

//     getQuiz();
//   }, [quizId, dispatch]);

//   const handleNextQuestion = () => {
//     // Check if the selected answer is correct and update the result.
//     const isCorrect = quizTrack.selectedAnswer === currentQuestion.correctOption;
//     const newResult = { ...result };
//     if (isCorrect) {
//       newResult.score += 1;
//       newResult.correctAnswers += 1;
//     } else {
//       newResult.wrongAnswers += 1;
//     }

//     // Update Redux with the new result.
//     dispatch(updateQuizResult(newResult));

//     // Move to the next question or show the result.
//     if (quizTrack.activeQuestion < quizLength - 1) {
//       setQuizTrack((prevTrack) => ({
//         ...prevTrack,
//         activeQuestion: prevTrack.activeQuestion + 1,
//         selectedAnswer: "",
//         checked: false,
//         selectedAnswerIndex: null,
//       }));
//     } else {
//       setQuizTrack((prevTrack) => ({ ...prevTrack, showResult: true }));
//     }
//   };

//   const handleOptionSelect = (option, index) => {
//     // Update the selected answer when an option is selected.
//     setQuizTrack((prevTrack) => ({
//       ...prevTrack,
//       selectedAnswer: option,
//       selectedAnswerIndex: index,
//     }));
//   };

//   return (
//     <div className="self-start">
//       <div className="flex flex-col gap-3">
//         <div className="text-primary text-3xl">{quizName}</div>
//         <div className="text-secondary">
//           Question {quizTrack.activeQuestion + 1} / {quizLength}
//         </div>
//       </div>
//       <div>
//         {quizTrack.showResult ? (
//           <div className="text-primary">
//             <div>Your Quiz Score: {result.score}</div>
//             <div>Correct Answers: {result.correctAnswers}</div>
//             <div>Wrong Answers: {result.wrongAnswers}</div>
//           </div>
//         ) : (
//           <div className="text-primary">
//             <div>
//               <h3 className="text-primary">{currentQuestion.question}</h3>
//             </div>
//             <div>
//               {currentQuestion.options.map((option, index) => (
//                 <div key={index}>
//                   <label>
//                     <input
//                       type="radio"
//                       name="options"
//                       value={option}
//                       checked={quizTrack.selectedAnswerIndex === index}
//                       onChange={() => handleOptionSelect(option, index)}
//                     />
//                     {option}
//                   </label>
//                 </div>
//               ))}
//             </div>
//             <div>
//               <button onClick={handleNextQuestion}>Next Question</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
