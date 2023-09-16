"use client";

import Quizform from "@/components/Quizform";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearQuestions } from "@/redux/slice/quizFormSlice";

const Createquiz = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const quizQuestions = useSelector((state) => state.quizForm.questions);
  const quizName = useSelector((state) => state.quizForm.quizName);
  const quizDesc = useSelector((state) => state.quizForm.quizDesc);
  const router = useRouter();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(session, quizQuestions);
  // }, [session, quizQuestions]);

  const handleSubmit = async () => {
    // console.log(quizQuestions.length);

    if (quizQuestions.length < 1) {
      alert("Kindly add questions to the quiz");
      return;
    } else if (quizName === "") {
      alert("Kindly give the the quiz a name");
      return;
    } else if (quizDesc === "") {
      alert("Kindly give the quiz a description");
      return;
    }

    setIsLoading(true);
    const quizData = {
      quizName,
      quizDesc,
      quizQuestions,
      author: session?.user.id,
    };

    // console.log(quizData);

    const response = await fetch("api/quiz/new", {
      method: "POST",
      body: JSON.stringify(quizData),
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));

    setIsLoading(false);

    if (response.message === "Created successfully") {
      alert("Quiz created successfully");

      router.push("/");
      dispatch(clearQuestions());
    } else alert("Quiz creation failed, please try again");
  };

  return <Quizform handleSubmit={handleSubmit} isLoading={isLoading} />;
};

export default Createquiz;
