import { connectDb } from "@/utils/database";
import Quiz from "@/models/quizModels";

export const POST = async (req, res) => {
  try {
    const { quizTakerId, result } = req.body;

    connectDb();

    await Quiz.findByIdAndUpdate(quizTakerId, {
      $push: {
        result,
      },
    });

    return new Response(JSON.stringify("The result was added successfully"), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("Failed to add quiz results"), {
      status: 500,
    });
  }
};
