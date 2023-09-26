import { connectDb } from "@/utils/database";
import Quiz from "@/models/quizModels";

export const GET = async (request, { params }) => {
    
    try {
        await connectDb();
        console.log(params.id);

    const quizData = await Quiz.findById(params.id).populate('author');
    console.log(quizData);

    if (!quizData) return new Response("Quiz not found", { status: 404 });

    return new Response(
      JSON.stringify({ data: quizData, message: "Got quiz successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("Failed to fetch the quiz"), {
      status: 500,
    });
  }
};
