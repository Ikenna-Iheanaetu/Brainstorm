  // <div>
  //     <div className="flex flex-col gap-3">
  //       <div className="text-primary text-3xl">{quizName}</div>
  //       <div className="text-secondary">
  //         Question {quizTrack.activeQuestion + 1} / {quizLength}
  //       </div>
  //     </div>
  //     <div>
  //       {!quizTrack.showResult ? (
  //         <div className="text-primary">
  //           {currentQuestion ? (
  //             <div>
  //               <div>
  //                 <h3 className="text-primary mt-4 text-3xl">
  //                   Question: {currentQuestion.question}
  //                 </h3>
  //               </div>
  //               <div className="mt-5 glass_opt p-4 flex flex-col gap-5">
  //                 {currentQuestion.options.map((option, index) => (
  //                   <div key={index} className="block">
  //                     <label className="flex gap-3 text-[20px]">
  //                       <input
  //                         type="radio"
  //                         name="options"
  //                         value={option}
  //                         checked={quizTrack.selectedAnswerIndex === index}
  //                         onChange={() => handleOptionSelect(option, index)}
  //                       />
  //                       {option}
  //                     </label>
  //                   </div>
  //                 ))}
  //               </div>
  //               <div>
  //                 <button
  //                   className="white_btn mt-4 ml-auto"
  //                   onClick={() => handleNextQuestion()}
  //                 >
  //                   Next
  //                 </button>
  //               </div>
  //             </div>
  //           ) : (
  //             <div className="text-primary">No available questions</div>
  //           )}
  //         </div>
  //       ) : (
  //         <div className="text-primary">question</div>
  //       )}
  //     </div>
  //   </div>