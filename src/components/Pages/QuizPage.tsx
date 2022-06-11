import React, {useEffect} from 'react';
import {quizListStore} from "../../store/QuizListStore";
import {NavLink, useNavigate, useParams} from "react-router-dom";
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
                <div className="quiz-title">
                    {quizListStore.quiz?.title}
                </div>
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
                                    <div className="quiz-question__total-answers">
                                        На этот вопрос ответило пользователей: {question.total_answers}
                                    </div>
                                    {
                                        question.answers.map((answer) => <AnswerItem key={answer.id} id={answer.id}
                                                                                     answer={answer.answer}
                                                                                     was_chosen_count={answer.was_chosen_count}
                                                                                     question={question}/>)
                                    }
                                </div>
                            )
                        }
                    )
                }
                {/*{quizListStore.quiz?.sub_answers_list}*/}

            </div>

            <div className="sub_answers_list">
                Список ответов пользователей на которых вы подписаны:
                {quizListStore.quiz?.sub_answers_list.map((answer) => <div key={answer.answer.answer}>
                    <NavLink className="post__user-link quiz-sub-answer__profile" to={`/profile/${answer.user.login}/`}>
                        <img className="post__user-pic" src={`http://127.0.0.1:8000${answer.user.avatar}`} alt=""/>
                        {answer.user.login}
                    </NavLink>
                    <div className="sub_answers_list-item">
                        {answer.answer.answer}
                    </div>
                </div>)}
            </div>
            {   authStore.user?.name! === login!
                &&
                <form className="create-question-form" onSubmit={onSubmit}>
                    <div>Вопрос</div>

                    <input className="create-question-input edit-form__field" type="text" {...register(`question`)}/>

                    <div>Ответы</div>

                    <div className="create-answer__container">
                        {fields.map((field, index) => (
                            <input
                                className="create-answer-input edit-form__field"
                                key={field.id} // important to include key with field's id
                                {...register(`answers.${index}.value`)}
                            />

                        ))}
                        <div className="add-answer-btn__container">
                            <button className="add-answer-btn" type="button" onClick={() => append({value: ''})}>
                                Добавить ответ
                            </button>
                            <button className="add-answer-btn" type="button" onClick={() => remove(fields.length - 1)}>
                                Убрать ответ
                            </button>
                        </div>
                    </div>
                    <button className="create-question-btn" type="submit">
                        Создать вопрос
                    </button>
                </form>
            }
        </div>
    );
})
