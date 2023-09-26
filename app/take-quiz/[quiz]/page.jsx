"use client";

import React, { useEffect, useState } from "react";

export default function Page({ params }) {

  const [quizData, setQuizData] = useState([]);

  async function getQuiz() {
      const response = await fetch(`/api/quiz/${params?.quiz}`).then((res) => res.json());

      if(response){
        setQuizData(response.data)
      } else{
        console.log("Unexpected data structure")
      }
  }

  useEffect(() => {
    getQuiz()
  }, [])



return(
  <div>
    <div className='text-primary'>{params?.quiz} {quizData._id}</div>
  </div>
)

}
  
