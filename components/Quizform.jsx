"use client";

import React, { useEffect } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuizName,
  setQuizDesc,
  setCurrentQuestion,
  setCorrectOption,
  addQuestion,
  addOption,
  updatePreviewData,
  clearForm,
  deleteOption,
  deleteQuestion,
} from "@/redux/slice/quizFormSlice";

const QuizForm = ({ handleSubmit, isLoading }) => {
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

  const handleAddOption = () => {
    dispatch(
      addOption({
        optionIndex: options.length,
        optionText: "",
      })
    );
  };

  // Function to handle radio button selection for an option
  const handleOptionSelection = (optionIndex) => {
    dispatch(setCorrectOption(optionIndex));
  };

  const handleOptionText = (e, optionIndex) => {
    // Dispatch an action to add/update an option in the Redux store
    dispatch(
      addOption({
        optionIndex,
        optionText: e.target.value,
      })
    );
  };

  const handleDeleteQuestion = (questionIndex) => {
    dispatch(deleteQuestion({ questionIndex }));
  };

  const handleDeleteOption = (optionIndex) => {
    dispatch(deleteOption({ optionIndex }));
  };

  const handleClearForm = () => {
    dispatch(clearForm());
  };

  const handleEditPreviewQuestion = (questionIndex, updatedQuestionData) => {
    dispatch(updatePreviewData({ questionIndex, updatedQuestionData }));
  };

  const handleEditPreviewOptions = (questionIndex, options, correctOption) => {
    const updatedQuestionData = {
      options,
      correctOption,
    };

    dispatch(updatePreviewData({ questionIndex, updatedQuestionData }));
  };

  const handleDeletePreviewQuestion = (questionIndex) => {
    dispatch(deleteQuestion({ questionIndex }));
    dispatch(updatePreviewData({ questionIndex: 0 }));
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
                <h3 className="text-primary mb-3">{`Question ${
                  questionIndex + 1
                }`}</h3>

                <input
                  type="text"
                  className="border-b border-b-primary bg-inherit outline-none placeholder:text-primary-foreground text-lg text-primary px-4 py-3"
                  placeholder="Question"
                  value={question.question}
                  onChange={(e) =>
                    handleEditPreviewQuestion(questionIndex, {
                      question: e.target.value,
                    })
                  }
                />

                {question.options.map((option, optionIndex) => (
                  <div className="mt-4" key={optionIndex}>
                    <div className="flex gap-3 items-center">
                      <input
                        type="radio"
                        value={optionIndex}
                        checked={question.correctOption === optionIndex}
                        onChange={() => {
                          handleEditPreviewOptions(
                            questionIndex,
                            question.options,
                            optionIndex
                          );
                        }}
                      />
                      <input
                        type="text"
                        className="w-full border-b border-b-primary bg-inherit outline-none placeholder:text-primary-foreground text-lg text-primary px-4 py-3"
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) => {
                          const updatedOptions = [...question.options];
                          updatedOptions[optionIndex] = e.target.value;
                          handleEditPreviewOptions(
                            questionIndex,
                            updatedOptions,
                            question.correctOption
                          );
                        }}
                      />
                    </div>
                  </div>
                ))}

                <hr className="mt-8 mb-4" />

                <div className="flex gap-3 items-center justify-between">
                  <div>
                    <button
                      className="white_btn"
                      onClick={() => handleDeletePreviewQuestion(questionIndex)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-12 mb-5 flex flex-col justify-center">
          <div className="border border-l-[1rem] border-l-primary rounded-md">
            <div className="px-10 py-4 flex flex-col">
              <input
                type="text"
                className="border-b border-b-primary bg-inherit outline-none placeholder:text-primary-foreground text-lg text-primary px-4 py-3"
                placeholder="Question"
                value={currentQuestion}
                onChange={(e) => {
                  dispatch(setCurrentQuestion(e.target.value));
                }}
              />

              <div className="mt-4">
                {options.map((option, optionIndex) => (
                  <div
                    className="flex gap-3 mt-2 items-center"
                    key={optionIndex}
                  >
                    <input
                      type="radio"
                      name={`correctOption-${optionIndex}`}
                      value={optionIndex}
                      checked={correctOption === optionIndex}
                      onChange={() => handleOptionSelection(optionIndex)}
                    />
                    <input
                      type="text"
                      className="w-full border-b border-b-primary bg-inherit outline-none placeholder:text-primary-foreground text-lg text-primary px-4 py-3"
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) => handleOptionText(e, optionIndex)}
                    />
                    {optionIndex > 0 && (
                      <MdDelete
                        className="text-primary text-2xl cursor-pointer"
                        onClick={() => handleDeleteOption(optionIndex)}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <div
                  className="flex gap-3 items-center cursor-pointer"
                  onClick={() => handleAddOption()}
                >
                  <p className="text-primary-foreground">Add another option</p>
                </div>
              </div>

              <hr className="mt-8 mb-4" />

              <div className="flex gap-3 flex-col items-center justify-between min-[350px]:flex-row">
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
            </div>
          </div>
        </div>

        <div onClick={() => handleSubmit()}>
          <button className="my-4 white_btn">
            {isLoading ? "Creating...." : "Create quiz"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuizForm;
