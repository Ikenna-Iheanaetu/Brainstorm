"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Page({ params }) {
  const { data: session } = useSession();

  const [quizData, setQuizData] = useState([]);
  const [author, setAuthor] = useState([]);
  const router = useRouter();

  async function getQuiz() {
    const response = await fetch(`/api/quiz/${params?.quiz}`).then((res) =>
      res.json()
    );

    if (response) {
      setQuizData(response.data);
      console.log(response.data);
      setAuthor(response.data.author);
    } else {
      console.log("Unexpected data structure");
    }
  }

  useEffect(() => {
    getQuiz();
  }, []);

  function beginQuiz() {
    if (session !== null) {
      router.push(`/take-quiz?id=${params?.quiz}`);
    } else {
      alert("Kindly SignUp to begin the quiz")
    }
  }

  return (
    <div className="block self-start">
      <div className="text-primary flex flex-col gap-4 place-items-start">
        <span className="text-4xl">{`Author:  ${author.username}`}</span>
        <span className="text-2xl">{`Quiz name:  ${quizData.quizName}`}</span>
        <span className="text-2xl">{`Quiz description:  ${quizData.quizDesc}`}</span>
        <span className="text-sm">{`Quiz creation:  ${quizData.createdAt}`}</span>

        <p className="text-md text-secondary">
          Ready to challenge your intellect and have some fun? Begin this quiz
          now!!
        </p>

        <button className="white_btn" onClick={() => beginQuiz()}>
          Begin Quiz
        </button>
      </div>
    </div>
  );
}
