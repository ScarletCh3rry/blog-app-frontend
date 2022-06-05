import { User } from "./User"

export type Quiz = {
    title: string
    slug: string
}

export type PassedQuestion = {
    answer: string
    user: User
}

export type Question = {
    question: string
    answers: Answer[]
    id: number
    chosen: string | null
}

export type Answer = {
    answer: string
    was_chosen_count: number
    id: number
}

export type FullQuiz = {
    title: string
    slug: string
    questions: Question[]
    sub_answers_list: PassedQuestion[]
    post_id: number
    id: number
}
