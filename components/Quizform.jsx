"use client";

// QuizForm.js

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuizName,
  setQuizDesc,
  addQuestion,
  addOption,
  clearForm,
  deleteQuestion,
  setCurrentQuestion,
  setCorrectOption,
  setCurrentOptions,
} from "@/redux/slice/quizFormSlice";

import { RxCrossCircled } from "react-icons/rx";
import { MdDelete } from "react-icons/md";

const QuizForm = () => {
  const quizForm = useSelector((state) => state.quizForm);
  const dispatch = useDispatch();

  const {
    quizName,
    quizDesc,
    questions,
    currentQuestion,
    currentOptions,
    correctOption,
  } = quizForm;

  const handleAddQuestion = () => {
    if (currentQuestion) {
      const newQuestion = {
        id: Date.now(),
        question: currentQuestion,
        options: [...currentOptions],
      };

      dispatch(addQuestion(newQuestion));
      dispatch(setCurrentQuestion(""));
      dispatch(setCurrentOptions([]));
      dispatch(setCorrectOption(0));

      console.log(questions)
    } else {
      alert("Please fill in the question.");
    }
  };

  const handleAddOption = () => {
    const updatedOptions = [...currentOptions, ""];
    dispatch(setCurrentOptions(updatedOptions));
  };

  const handleDeleteOption = (questionId, optionIndex) => {
    const question = questions.find((q) => q.id === questionId);
    if (question) {
      const updatedOptions = question.options.filter(
        (_, idx) => idx !== optionIndex
      );
      dispatch(
        addOption({
          questionId: question.id,
          options: updatedOptions,
        })
      );
    }
  };

  const handleDeleteQuestion = (questionId) => {
    dispatch(deleteQuestion({ id: questionId }));
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


          <div className="mt-12 mb-5 flex flex-col justify-center" key={0}>
            <div className="border border-l-[1rem] border-l-primary rounded-md">
              <div className="px-10 py-4 flex flex-col">
                <input
                  type="text"
                  className="border-b border-b-primary bg-inherit outline-none placeholder:text-primary-foreground text-lg text-primary px-4 py-3"
                  placeholder="Question"
                  value={currentQuestion}
                  onChange={(e) => dispatch(setCurrentQuestion(e.target.value))}
                />

                {currentOptions.map((option, optionIndex) => (
                  <div className="mt-4" key={optionIndex}>
                    <div className="flex gap-3 items-center">
                      <input
                        type="radio"
                        value={optionIndex}
                        checked={correctOption === optionIndex}
                        onChange={() => dispatch(setCorrectOption(optionIndex))}
                      />
                      <input
                        type="text"
                        className="w-full border-b border-b-primary bg-inherit outline-none placeholder:text-primary-foreground text-lg text-primary px-4 py-3"
                        placeholder="Option"
                        value={option}
                        onChange={(e) =>
                          dispatch(
                            setCurrentOptions({
                              optionIndex,
                              option: e.target.value,
                            })
                          )
                        }
                      />
                      {optionIndex > 0 && (
                        <RxCrossCircled
                          className="text-primary text-2xl cursor-pointer"
                          onClick={() => handleDeleteOption(0, optionIndex)}
                        />
                      )}
                    </div>
                  </div>
                ))}

                <div className="mt-6">
                  <div
                    className="flex gap-3 items-center cursor-pointer"
                    onClick={handleAddOption}
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
                    <button className="white_btn" onClick={handleAddQuestion}>
                      Add Question
                    </button>
                    <button className="outline_btn" onClick={handleClearForm}>
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
        
       {/*} {questions.map((question) => (
          <div
            className="mt-12 mb-5 flex flex-col justify-center"
            key={question.id}
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
                        id: question.id,
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
                        checked={correctOption === optionIndex}
                        onChange={() => dispatch(setCorrectOption(optionIndex))}
                      />
                      <input
                        type="text"
                        className="w-full border-b border-b-primary bg-inherit outline-none placeholder:text-primary-foreground text-lg text-primary px-4 py-3"
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) =>
                          dispatch(
                            addOption({
                              questionId: question.id,
                              optionId: optionIndex,
                              option: e.target.value,
                            })
                          )
                        }
                      />
                      {optionIndex > 0 && (
                        <RxCrossCircled
                          className="text-primary text-2xl cursor-pointer"
                          onClick={() =>
                            handleDeleteOption(question.id, optionIndex)
                          }
                        />
                      )}
                    </div>
                  </div>
                ))}
                <div className="mt-6">
                  <div
                    className="flex gap-3 items-center cursor-pointer"
                    onClick={() => handleAddOption()}
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
                    <button className="white_btn" onClick={handleAddQuestion}>
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
                      onClick={() => handleDeleteQuestion(question.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
                        ))} */}
      </div>
    </section>
  );
};

export default QuizForm;
