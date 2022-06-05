import React, {useEffect} from 'react';
import {quizListStore} from "../../store/QuizListStore";
import {useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useFieldArray, useForm} from 'react-hook-form';
import {authStore} from "../../store/AuthStore";
import {AnswerItem} from "../AnswerItem";
import {fullPostStore} from "../../store/FullPostStore";

export type CreateQuestionForm = {
    question: string
    answers: { value: string }[]
}

export const QuizPage = observer(() => {

    const {login, blogSlug, postSlug, quizSlug} = useParams()

    useEffect(() => {
        quizListStore.getCertainQuiz(login!, blogSlug!, postSlug!, quizSlug!).then()
    }, []) //eslint-disable-line


    const {control, register, handleSubmit} = useForm<CreateQuestionForm>({
        defaultValues: {
            answers: [],
            question: ''
        }
    });
    const {fields, append, remove} = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "answers", // unique name for your Field Array
    });

    const onSubmit = handleSubmit((data) => {
        quizListStore.createQuestion(login!, blogSlug!, postSlug!, quizSlug!, data.question, data.answers.map(item => item.value))
            .then(() => quizListStore.getCertainQuiz(login!, blogSlug!, postSlug!, quizSlug!))
    })

    // const setThisAnswer = (answer: number) => {
    //     quizListStore.passQuestion(login!, blogSlug!, postSlug!, quizSlug!, authStore.user?.id!, answer)
    // }

    const navigate = useNavigate()

    const deleteQuiz = (login:string, blogSlug:string, postSlug:string, quizSlug:string) => {
        quizListStore.deleteQuiz(login, blogSlug, postSlug, quizSlug)
            .then(() => navigate(`/blogs/${login}/${blogSlug}/${postSlug}`))
    }



    return (
        <div className="quiz-page">
            <div className="quiz">
                {quizListStore.quiz?.title}
                {
                    authStore.user?.name === fullPostStore.post?.blog.owner.login &&
                    <button className="delete-quiz-btn" onClick={() => deleteQuiz(login!, blogSlug!, postSlug!, quizSlug!)}>
                        Удалить опрос
                    </button>
                }
                {
                    quizListStore.quiz?.questions.map(
                        (question) => {
                            return (
                                <div key={question.question} className="quiz-question__container">
                                    <div className="quiz-question">
                                        {question.question}
                                    </div>
                                    {
                                        question.answers.map((answer) => <AnswerItem key={answer.id} id={answer.id} answer={answer.answer} was_chosen_count={answer.was_chosen_count} question={question}/>)
                                    }
                                </div>
                            )
                        }
                    )
                }
                {/*{quizListStore.quiz?.sub_answers_list}*/}
            </div>
            {   authStore.user?.name! === login!
                &&
                <form onSubmit={onSubmit}>
                    <div>Вопрос</div>
                    <input type="text" {...register(`question`)}/>
                    <div>Ответы</div>

                    {fields.map((field, index) => (
                        <input
                            key={field.id} // important to include key with field's id
                            {...register(`answers.${index}.value`)}
                        />

                    ))}
                    <button type="button" onClick={() => append({value: ''})}>
                        +++++++++
                    </button>
                    <button type="button" onClick={() => remove(fields.length - 1)}>
                        ---------
                    </button>
                    <button type="submit">
                        OAOAOAOAOA
                    </button>
                </form>
            }
        </div>
    );
})
