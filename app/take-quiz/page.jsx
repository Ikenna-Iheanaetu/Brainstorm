"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setQuizQuestions } from "@/redux/slice/takenQuizSlice";
import { updateQuizResult } from "@/redux/slice/quizResultSlice";
import CountUp from "react-countup";

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
  const quizResult = useSelector((state) => state.quizResult);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const quizId = searchParams.get("id");
  const [quizAuthorId, setQuizAuthorId] = useState('')

  useEffect(() => {
    async function getQuiz() {
      const response = await fetch(`/api/quiz/${quizId}`).then((res) =>
        res.json()
      );

      if (response) {
        const questions = response.data.quizQuestions;
        dispatch(setQuizQuestions({ questions }));
        setQuizName(response.data.quizName);
        console.log(questions)
      }
    }

    getQuiz();
  }, [quizId, dispatch]);

  const { questions, quizLength } = quiz;
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

  const handleAddResultToDb = async () => {
    try {
      await fetch('/api/quiz/results',{
        method: POST,
        body: {
          quizTakerId: null,
          result: quizResult
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleNextQuestion = () => {
    // Check if the selected answer is correct and update the result.
    const isCorrect =
      quizTrack.selectedAnswerIndex === currentQuestion[0].correctOption;
    const newResult = { ...quizResult };

    if (isCorrect) {
      newResult.score += 1;
      newResult.correctAnswers += 1;
    } else {
      newResult.wrongAnswers += 1;
    }
    console.log(isCorrect, newResult);

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
      console.log(quizResult);
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
          <div className="text-primary">
            <div>
              <h4 className="text-primary text-2xl mt-5">
                This is you result!!!
              </h4>
            </div>
            <div>
              <CountUp start={0} end={quizResult.percentage} delay={0}>
                {({ countUpRef }) => (
                  <div>
                    <div>
                      <span className="text-primary text-xl" ref={countUpRef} />
                      <span className="text-primary text-xl">%</span>
                    </div>
                  </div>
                )}
              </CountUp>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
