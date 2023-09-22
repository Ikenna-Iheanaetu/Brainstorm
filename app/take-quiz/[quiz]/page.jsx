'use client'

import React from "react";
import { useSearchParams } from "next/navigation";

const page = ({ params }) => {
    const searchParams = useSearchParams()
    const quizAuthor = searchParams.get("name")
  return (
    <div>
      <h1 className="text-primary">This is the quiz id { params?.quiz } made by { quizAuthor }</h1>
    </div>
  );
};

export default page;
