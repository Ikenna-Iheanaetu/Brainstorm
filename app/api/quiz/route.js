import { connectDb } from '@/utils/database'
import Quiz from '@/models/quizModels'

export const GET = async (req, res) => {
    try{
        connectDb()

        const quiz = await Quiz.find({}).populate('author') 


        return new Response(JSON.stringify(quiz), { status: 200 })
    }catch(error){
        console.log(error)
        return new Response(JSON.stringify({message: 'Failed to fetch question data'}), { status: 500 })
    }
}