'use client'

import { useState, useEffect } from "react";
import Feed from "@/components/Feed";




export default function Home() {

  const [feedData, setFeedData] = useState([]);


  async function get() {
    const data = await fetch("/api/quiz").then((res) =>
      res.json()
    );
    setFeedData(data);
  }

  useEffect(() => {
    get();
  }, []);


  return (
    <>
      <div className="items-left flex flex-col gap-3">
        <h1 className="text-primary text-4xl">Brain storm</h1>
        <h3 className="text-secondary text-sm leading-6 tracking-wide justify-center">
          Unleash the Power of Your Mind and Dive into a World of Limitless
          Learning, Excitement, and Intellectual Adventure - The Brainstorm Quiz
          App that is More Than Just a Game, Its Your Passport to Mastering
          Topics, Challenging Your Friends, and Achieving Quiz Nirvana, All in
          One Place!
        </h3>
      </div>
      <Feed feedData={feedData} />
    </>
  );
}
