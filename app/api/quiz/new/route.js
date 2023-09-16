import { connectDb } from "@/utils/database";
import Quiz from "@/models/quizModels";

export const POST = async (req, res) => {
  const { quizQuestions, author, quizName, quizDesc, createdAt } = await req.json();

  try {
    await connectDb();

    // console.log({quizQuestions, author, quizName, quizDesc})

    const newQuiz = new Quiz({
      quizQuestions,
      author,
      createdAt,
      quizName,
      quizDesc,
    });

    await newQuiz.save();

    // console.log(newQuiz)
    return new Response(
      JSON.stringify({ message: "Created successfully", data: newQuiz }),
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return new Response("Failed to create quiz", { status: 500 });
  }
};
