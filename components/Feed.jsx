"use client";

import { useState, useEffect } from "react";
import Card from "./Card";

const DataCardList = ({ data }) => {
  return (
    <>
      {data.map((d) => (
        <Card key={d._id} data={d} />
      ))}
    </>
  );
};

export default function Feed() {
  const [feedData, setFeedData] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  async function get() {
    const data = await fetch("http://localhost:3000/api/quiz").then((res) =>
      res.json()
    );
    setFeedData(data);
  }

  const filterQuiz = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return feedData.filter(
      (item) => regex.test(item.author.username) || regex.test(item.quizName)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterQuiz(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <>
      <form className=" w-full mt-5">
        <input
          type="text"
          placeholder="Search for a quiz name or person"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input"
        />
      </form>

      <div
        className="mt-9 grid gap-4 grid-cols-1 min-[870px]:grid-cols-2 min-[1235px]:grid-cols-3"
      >
        {searchText ? (
          <DataCardList data={searchedResults} />
        ) : (
          <DataCardList data={feedData} />
        )}
      </div>
    </>
  );
}
