"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setQuizQuestions } from "@/redux/slice/takenQuizSlice";
import { updateQuizResult } from "@/redux/slice/quizResultSlice";

export default function Page() {
  const [quizName, setQuizName] = useState("");
  const [quizTrack, setQuizTrack] = useState({
    activeQuestion: 0,
    selectedAnswer: "",
    checked: false,
    selectedAnswerIndex: null,
    showResult: false,
  });
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const quiz = useSelector((state) => state.takenQuiz);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const quizId = searchParams.get("id");

  useEffect(() => {
    async function getQuiz() {
      const response = await fetch(`/api/quiz/${quizId}`).then((res) =>
        res.json()
      );

      if (response) {
        const questions = response.data.quizQuestions;
        // console.log(
        //   response.data.quizQuestions,
        //   response.data.quizQuestions
        // );
        dispatch(setQuizQuestions({ questions }));
        setQuizName(response.data.quizName);
      }
    }

    getQuiz();
  }, [quizId, dispatch]);

  const { questions, quizLength } = quiz;
  // const quizArray = ;
  const currentQuestion = questions[quizTrack.activeQuestion]; // Access the nested array

  // const test = [
  //   [
  //     {
  //       question: "Test question",
  //       options: ["Test1", "Test2"],
  //       correctOption: 0,
  //     },
  //   ],
  // ];
  // console.log(test, test[0][0], test[0].question);

  const handleNextQuestion = () => {
    // Check if the selected answer is correct and update the result.
    const isCorrect =
      quizTrack.selectedAnswer === currentQuestion.correctOption;
    const newResult = { ...result };
    if (isCorrect) {
      newResult.score += 1;
      newResult.correctAnswers += 1;
    } else {
      newResult.wrongAnswers += 1;
    }

    // Update Redux with the new result.
    dispatch(updateQuizResult(newResult));

    // Move to the next question or show the result.
    if (quizTrack.activeQuestion < quizLength - 1) {
      setQuizTrack((prevTrack) => ({
        ...prevTrack,
        activeQuestion: prevTrack.activeQuestion + 1,
        selectedAnswer: "",
        checked: false,
        selectedAnswerIndex: null,
      }));
    } else {
      setQuizTrack((prevTrack) => ({ ...prevTrack, showResult: true }));
    }
  };

  const handleOptionSelect = (option, index) => {
    setQuizTrack((prevTrack) => ({
      ...prevTrack,
      selectedAnswer: option,
      selectedAnswerIndex: index,
    }));
  };

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="text-primary text-3xl">{quizName}</div>
        <div className="text-secondary">
          Question {quizTrack.activeQuestion + 1} / {quizLength}
        </div>
      </div>
      <div>
        {!quizTrack.showResult ? (
          <div className="text-primary">
            {currentQuestion ? (
              <div>
                <div>
                  <h3 className="text-primary mt-4 text-3xl">
                    Question: {currentQuestion[0].question}
                  </h3>
                </div>
                <div className="mt-5 glass_opt p-4 flex flex-col gap-5">
                  {currentQuestion[0].options.map((option, index) => (
                    <div key={index} className="block">
                      <label className="flex gap-3 text-[20px]">
                        <input
                          type="radio"
                          name="options"
                          value={option}
                          checked={quizTrack.selectedAnswerIndex === index}
                          onChange={() => handleOptionSelect(option, index)}
                        />
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                <div>
                  <button
                    className="white_btn mt-4 ml-auto"
                    onClick={() => handleNextQuestion()}
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-primary">No available questions</div>
            )}
          </div>
        ) : (
          <div className="text-primary">question</div>
        )}
      </div>
    </div>
  );
}
