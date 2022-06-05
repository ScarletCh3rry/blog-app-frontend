import {action, makeAutoObservable} from "mobx";
import {Paginated} from "../types/Paginated";
import {FullQuiz, Question, Quiz} from "../types/Quiz";
import {quizAPI} from "../API/quizAPI";


class QuizList {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    quizes: Paginated<Quiz> = {count: 0, next: null, previous: null, results: []}
    quiz: FullQuiz | null = null

    fetchAllQuizes(login: string, blogSlug: string, postSlug: string) {
        return quizAPI.getAllQuizzes(login, blogSlug, postSlug)
            .then(
                action(
                    'fetchingAllQuizes',
                    (quizes) => {
                        this.quizes = quizes
                    }
                )
            )
    }

    getCertainQuiz(login: string, blogSlug: string, postSlug: string, quizSlug: string) {
        return quizAPI.getCertainQuiz(login, blogSlug, postSlug, quizSlug)
            .then(
                action(
                    'gotCertainQuiz',
                    (fullquiz) => {
                        this.quiz = fullquiz
                    }
                )
            )
    }

    createQuiz(login: string, blogSlug: string, postSlug: string, title: string, post_id: number) {
        return quizAPI.createQuiz(login, blogSlug, postSlug, title, post_id)
    }

    createQuestion(login: string, blogSlug: string, postSlug: string, quizSlug: string, question: string, answers: string[]) {
        return quizAPI.createQuestion(login, blogSlug, postSlug, quizSlug, question, answers)
    }

    passQuestion(login: string, blogSlug: string, postSlug: string, quizSlug: string, user: number, answer: number) {
        return quizAPI.passQuestion(login, blogSlug, postSlug, quizSlug, user, answer)
    }

    selectAnswer = (newAnswer: string, question: Question) => {
        const selectedAnswer = question.answers.find((answer) => answer.answer === newAnswer)
        selectedAnswer!.was_chosen_count++
        if (question.chosen){
            question.answers.find((answer) => question.chosen === answer.answer)!.was_chosen_count--
        }
        question.chosen = newAnswer
    }

    deleteQuiz = (login: string, blogSlug: string, postSlug: string, quizSlug: string) => {
        return quizAPI.deleteQuiz(login, blogSlug, postSlug, quizSlug)
    }
}

export const quizListStore = new QuizList()