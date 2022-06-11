import React from 'react';
import {quizListStore} from "../store/QuizListStore";
import {authStore} from "../store/AuthStore";
import {useParams} from "react-router-dom";
import {Question} from "../types/Quiz";
import {AiOutlineArrowUp, BsCheckCircle} from 'react-icons/all';

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
            <button type="button" className="choose-answer__btn" onClick={() => {
                setThisAnswer(props.id)
            }}>
                <BsCheckCircle className="choose-answer__btn-icon"/>
                {props.answer}
            </button>
            {
                props.question.chosen === props.answer
                &&
                <div className="was_chosen_count">
                    <AiOutlineArrowUp className="arrow-up"/> Данный ответ выбрали {props.was_chosen_count} раз
                </div>
            }
        </div>
    );
}