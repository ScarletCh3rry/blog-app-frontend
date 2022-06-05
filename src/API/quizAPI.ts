import {api} from "./axios-instance";
import {FullQuiz, Question, Quiz} from "../types/Quiz";
import {Paginated} from "../types/Paginated";

class QuizAPI {
    getAllQuizzes = (login: string, blogSlug: string, postSlug: string) => {
        return api.get<Paginated<Quiz>>(`blogs/${login}/${blogSlug}/${postSlug}/quizes/`).then(res => res.data)
    }

    createQuiz = (login: string, blogSlug: string, postSlug: string, title: string, post: number) => {
        return api.post<Quiz>(`blogs/${login}/${blogSlug}/${postSlug}/create-quiz/`, {
            title,
            post
        }).then(res => res.data)
    }

    createQuestion = (login: string, blogSlug: string, postSlug: string, quizSlug: string, question: string, answers: string[]) => {
        return api.post<Question>(`blogs/${login}/${blogSlug}/${postSlug}/create-quiz/create-question/`, {
            quiz: quizSlug,
            question,
            answers
        }).then(res => res.data)
    }

    getCertainQuiz = (login: string, blogSlug: string, postSlug: string, quizSlug: string) => {
        return api.get<FullQuiz>(`blogs/${login}/${blogSlug}/${postSlug}/${quizSlug}/`).then(res => res.data)
    }

    passQuestion = (login: string, blogSlug: string, postSlug: string, quizSlug: string, user: number, answer: number) => {
        return api.patch<string>(`blogs/${login}/${blogSlug}/${postSlug}/${quizSlug}/passed-question/`, {
            user,
            answer
        }).then(res => res.data)
    }

    deleteQuiz = (login: string, blogSlug: string, postSlug: string, quizSlug: string) => {
        return api.delete(`blogs/${login}/${blogSlug}/${postSlug}/${quizSlug}/delete-quiz/`)
    }
}

export const quizAPI = new QuizAPI()