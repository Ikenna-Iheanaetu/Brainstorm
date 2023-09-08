<div className="mt-12 mb-5 flex flex-col justify-center">
  <div className="border border-l-[1rem] border-l-primary rounded-md">
    <div className="px-10 py-4 flex flex-col">
      <input
        type="text"
        className="border-b border-b-primary bg-inherit outline-none placeholder:text-primary-foreground text-lg text-primary px-4 py-3"
        placeholder="Question"
      />

      <div className="mt-4">
        <div className="flex gap-3 items-center">
          <input type="radio" />
          <input
            type="text"
            className="w-full border-b border-b-primary bg-inherit outline-none placeholder:text-primary-foreground text-lg text-primary px-4 py-3"
            placeholder="Option"
          />
          <RxCrossCircled className="text-primary text-2xl cursor-pointer" />
        </div>
      </div>
      <div className="mt-6">
        <div className="flex gap-3 items-center">
          <input type="radio" />
          <p className="text-primary-foreground">Add another option</p>
        </div>
      </div>

      <hr className="mt-8 mb-4" />

      <div className="flex gap-3 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="white_btn">Add Question</button>
          <button className="outline_btn">Clear question</button>
        </div>
        <div>
          <MdDelete className="text-primary text-2xl cursor-pointer" />
        </div>
      </div>
    </div>
  </div>
</div>;



'use client'

import React, { useEffect } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuizName,
  setQuizDesc,
  addQuestion,
  addOption,
  clearForm,
  deleteOption,
  deleteQuestion,
} from "@/redux/slice/quizFormSlice";

const QuizForm = () => {
  const quizForm = useSelector((state) => state.quizForm);
  const dispatch = useDispatch();

  const {
    quizName,
    quizDesc,
    questions,
    currentQuestion,
    options,
    correctOption,
  } = quizForm;

  useEffect(() => {
    console.log(quizName, quizDesc);
  }, [quizName, quizDesc]);

  const handleAddQuestion = () => {
    if (currentQuestion && options.every((option) => option.trim() !== "")) {
      dispatch(
        addQuestion({
          question: currentQuestion,
          options: [...options],
          correctOption,
        })
      );
      // Clear the current question and options after adding
      dispatch(clearForm());
    } else {
      alert("Please fill in all fields for the question.");
    }
  };

  const handleAddOption = (questionIndex) => {
    dispatch(addOption({ questionIndex, option: "" }));
  };

  const handleDeleteQuestion = (questionIndex) => {
    dispatch(deleteQuestion(questionIndex));
  };

  const handleDeleteOption = (questionIndex, optionIndex) => {
    dispatch(deleteOption({ questionIndex, optionIndex }));
  };

  const handleClearForm = () => {
    dispatch(clearForm());
  };

  return (
    <section className="w-full">
      <div className="text-left flex flex-col gap-4">
        <h1 className="text-primary text-6xl">Create quiz page</h1>
        <p className="text-primary-foreground">
          Welcome to the Create Quiz Page. Get started with your quiz creation
          now!
        </p>
      </div>

      <div className="sm:px-10 mt-12 flex flex-col justify-center">
        <div className="px-6 py-6 border border-t-[2rem] border-t-primary rounded-md border-borderColor">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              className="input_name"
              placeholder="Quiz name...."
              value={quizName}
              onChange={(e) => dispatch(setQuizName(e.target.value))}
            />
            <textarea
              className="input_desc"
              type="text"
              placeholder="Quiz description...."
              value={quizDesc}
              onChange={(e) => dispatch(setQuizDesc(e.target.value))}
            />
          </div>
        </div>

        {questions.map((question, questionIndex) => (
          <div
            className="mt-12 mb-5 flex flex-col justify-center"
            key={questionIndex}
          >
            <div className="border border-l-[1rem] border-l-primary rounded-md">
              <div className="px-10 py-4 flex flex-col">
                <input
                  type="text"
                  className="border-b border-b-primary bg-inherit outline-none placeholder:text-primary-foreground text-lg text-primary px-4 py-3"
                  placeholder="Question"
                  value={question.question}
                  onChange={(e) =>
                    dispatch(
                      addQuestion({
                        ...question,
                        question: e.target.value,
                      })
                    )
                  }
                />
                {question.options.map((option, optionIndex) => (
                  <div className="mt-4" key={optionIndex}>
                    <div className="flex gap-3 items-center">
                      <input
                        type="radio"
                        value={optionIndex}
                        checked={question.correctOption === optionIndex}
                        onChange={() =>
                          dispatch(
                            addQuestion({
                              ...question,
                              correctOption: optionIndex,
                            })
                          )
                        }
                      />
                      <input
                        type="text"
                        className="w-full border-b border-b-primary bg-inherit outline-none placeholder:text-primary-foreground text-lg text-primary px-4 py-3"
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) =>
                          dispatch(
                            addQuestion({
                              ...question,
                              options: question.options.map((opt, idx) =>
                                idx === optionIndex
                                  ? e.target.value
                                  : opt
                              ),
                            })
                          )
                        }
                      />
                      {optionIndex > 0 && (
                        <RxCrossCircled
                          className="text-primary text-2xl cursor-pointer"
                          onClick={() =>
                            handleDeleteOption(
                              questionIndex,
                              optionIndex
                            )
                          }
                        />
                      )}
                    </div>
                  </div>
                ))}
                <div className="mt-6">
                  <div
                    className="flex gap-3 items-center"
                    onClick={() => handleAddOption(questionIndex)}
                  >
                    <input type="radio" />
                    <p className="text-primary-foreground">
                      Add another option
                    </p>
                  </div>
                </div>

                <hr className="mt-8 mb-4" />

                <div className="flex gap-3 items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      className="white_btn"
                      onClick={() => handleAddQuestion()}
                    >
                      Add Question
                    </button>
                    <button
                      className="outline_btn"
                      onClick={() => handleClearForm()}
                    >
                      Clear question
                    </button>
                  </div>
                  <div>
                    <MdDelete
                      className="text-primary text-2xl cursor-pointer"
                      onClick={() => handleDeleteQuestion(questionIndex)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Render the block conditionally */}
        {questions.length === 0 && (
          <div className="mt-12 mb-5 flex flex-col justify-center">
            <div className="border border-l-[1rem] border-l-primary rounded-md">
              <div className="px-10 py-4 flex flex-col">
                <input
                  type="text"
                  className="border-b border-b-primary bg-inherit outline-none placeholder:text-primary-foreground text-lg text-primary px-4 py-3"
                  placeholder="Question"
                  value={currentQuestion}
                  onChange={(e) =>
                    dispatch(
                      addQuestion({
                        question: e.target.value,
                        options: [""],
                        correctOption: 0,
                      })
                    )
                  }
                />

                <div className="mt-4">
                  <div className="flex gap-3 items-center">
                    <input type="radio" />
                    <input
                      type="text"
                      className="w-full border-b border-b-primary bg-inherit outline-none placeholder:text-primary-foreground text-lg text-primary px-4 py-3"
                      placeholder="Option"
                    />
                    <RxCrossCircled
                      className="text-primary text-2xl cursor-pointer"
                      onClick={() => handleDeleteOption(0, 0)}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <div
                    className="flex gap-3 items-center cursor-pointer"
                    onClick={() => handleAddOption(0)}
                  >
                    <input type="radio" />
                    <p className="text-primary-foreground">
                      Add another option
                    </p>
                  </div>
                </div>

                <hr className="mt-8 mb-4" />

                <div className="flex gap-3 items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      className="white_btn"
                      onClick={() => handleAddQuestion()}
                    >
                      Add Question
                    </button>
                    <button
                      className="outline_btn"
                      onClick={() => handleClearForm()}
                    >
                      Clear question
                    </button>
                  </div>
                  <div>
                    <MdDelete
                      className="text-primary text-2xl cursor-pointer"
                      onClick={() => handleDeleteQuestion(0)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default QuizForm;
