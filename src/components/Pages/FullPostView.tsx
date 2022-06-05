import React, {useEffect, useState} from 'react';
import {fullPostStore} from "../../store/FullPostStore";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {quizListStore} from "../../store/QuizListStore";
import {authStore} from "../../store/AuthStore";

export const FullPostView = observer(() => {
    const {login, blogSlug, postSlug} = useParams()
    useEffect(() => {
        fullPostStore.fetchFullPost(login!, blogSlug!, postSlug!).then()// eslint-disable-next-line
    }, [])

    const navigate = useNavigate()

    const deletePost = () => {
        fullPostStore.deletePost(login!, blogSlug!, postSlug!)
            .then(() => navigate('/'))
    }

    useEffect(() => {
        fullPostStore.fetchAllComments(login!, blogSlug!, postSlug!).then()
    }, []) //eslint-disable-line


    useEffect(() => {
        quizListStore.fetchAllQuizes(login!, blogSlug!, postSlug!).then()
    }, []) //eslint-disable-line

    const createComment = (comment: string) => {
        fullPostStore.createComment(login!, blogSlug!, postSlug!, comment, fullPostStore.post?.id!).then(() => {
            setAddedComment(addedComment + 1)
        })
    }
    const [comment, setComment] = useState('')
    const [quizTitle, setquizTitle] = useState('')
    const [addedComment, setAddedComment] = useState(0)

    useEffect(() => {
        fullPostStore.fetchAllComments(login!, blogSlug!, postSlug!).then()
    }, [addedComment]) //eslint-disable-line

    const createQuiz = (quizTitle: string) => {
        quizListStore.createQuiz(login!, blogSlug!, postSlug!, quizTitle, fullPostStore.post?.id!).then(
            (quiz) => {
                navigate(`/blogs/${login}/${blogSlug}/${postSlug}/${quiz.slug}`)
            }
        )
    }

    return (
        <div className="fullpost-container">
            <div>
                {fullPostStore.post?.description}
            </div>
            <div className="full-post__commentary-section">
                Комментарии:
                {
                    fullPostStore.comments.results.map(comment => {
                        return (
                            <div key={comment.id}>{comment.owner.login} {comment.owner.avatar} {comment.text}</div>
                        )
                    })
                }
            </div>
            {
                authStore.isAuth
                ?
                    <div>
                        Написать комментарий:
                        <input type="textarea" onChange={e => setComment(e.target.value)}/>
                        <button onClick={() => createComment(comment)}>Создать комментарий</button>
                    </div>
                    :
                    <div className="not-authorizated">
                        Авторизуйтесь, чтобы написать комментарий
                    </div>
            }
            {
                fullPostStore.post?.blog.owner.login === authStore.user?.name &&
                <button onClick={deletePost}>
                    Удалить пост
                </button>
            }
            {
                authStore.isAuth
                ?
                    <div className="quiz-list">
                        {
                            quizListStore.quizes.results.map((quiz) => {
                                return (
                                    <div key={quiz.slug}>
                                        <NavLink to={`${quiz.slug}`}>
                                            {quiz.title}
                                        </NavLink>
                                    </div>
                                )
                            })
                        }
                    </div>
                    :
                    <div className="not-authorizated">
                        Авторизуйтесь, чтобы проходить опросы
                    </div>
            }
            {
                fullPostStore.post?.blog.owner.login === authStore.user?.name &&
                <div>
                    Создать опрос:
                    <input type="textarea" onChange={e => setquizTitle(e.target.value)}/>
                    <button onClick={() => createQuiz(quizTitle)}>Создать опрос</button>
                </div>
            }
        </div>
    );
})