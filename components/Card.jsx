import Image from "next/image";
import { BsArrowRightShort } from "react-icons/bs";

export default function Card({ data }) {
  return (
     <div className="card p-5 bg-primary mb-5">
        <div className="flex flex-col-reverse gap-3 min-[340px]:flex-row min-[340px]:items-center justify-between">
          <div className="flex flex-col">
            <span className="font-bold">{data.author.username}</span>
            <span className="text-sm truncate">{data.author.email}</span>
          </div>
          <Image
            src={data.author.image}
            width={35}
            height={35}
            alt="Author Image"
            className="rounded-full hover:cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-3 mt-2">
          <span className="text-2xl text-accent">{data.quizName}</span>
          <span className="truncate">{data.quizDesc}</span>
        </div>
        <div className="flex items-center gap-4 justify-between mt-5">
          <span className="text-[12px]">Created on {data.createdAt}</span>
          <BsArrowRightShort className="text-2xl text-primary bg-accent rounded-full hover:cursor-pointer" />
        </div>
      </div>
  );
}
