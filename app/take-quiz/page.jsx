"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setQuizQuestions } from "@/redux/slice/takenQuizSlice";

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
        const questions = response.data.quizQuestions[0];
        // console.log(response.data.quizQuestions[0])
        dispatch(setQuizQuestions({ questions }));
        setQuizName(response.data.quizName);
      }
    }

    getQuiz();
  }, [quizId, dispatch]);

  const { questions, quizLength } = quiz;
  const currentQuestion = questions[quizTrack.activeQuestion]; // Access the nested array

  const test = [
    {
      question: "Test question",
      options: ["Test1", "Test2"],
      correctOption: 0,
    },
  ];

  console.log(
    currentQuestion,
    // currentQuestion.options,
    currentQuestion?.question
  );
  console.log(test, test[0], test[0].question);

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
                    Question: {currentQuestion.question}
                  </h3>
                </div>
                <div className="mt-5 glass_opt p-4 flex flex-col gap-5">
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="block">
                      <label className="flex gap-3 text-[20px]">
                        <input
                          type="radio"
                          name="options"
                          value={option}
                          // checked={quizTrack.selectedAnswerIndex === index}
                          onChange={() => console.log('Selected')}
                        />
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                <div>
                    <button className="white_btn mt-4 ml-auto">
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
