import React from 'react';
import {quizListStore} from "../store/QuizListStore";
import {authStore} from "../store/AuthStore";
import {useParams} from "react-router-dom";
import {Question} from "../types/Quiz";

type Props = {
    id: number
    answer: string
    was_chosen_count: number
    question: Question
}


export const AnswerItem = (props: Props) => {

    const {login, blogSlug, postSlug, quizSlug} = useParams()

    const setThisAnswer = (answer: number) => {
        quizListStore.passQuestion(login!, blogSlug!, postSlug!, quizSlug!, authStore.user?.id!, answer)
            .then((answer) => {
                quizListStore.selectAnswer(answer, props.question)
            })
    }

    return (
        <div className="answer-item">
            <div className="quiz-answer">
                {props.answer}
            </div>
            <button type="button" className="set-answer-btn" onClick={() => {
                setThisAnswer(props.id)
            }}>
                {props.answer}
            </button>
            {
                props.question.chosen === props.answer
                &&
                <div>
                    Ответили {props.was_chosen_count} раз
                </div>
            }
        </div>
    );
}