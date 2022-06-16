import React, {useEffect, useState} from 'react';
import {fullPostStore} from "../../store/FullPostStore";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {quizListStore} from "../../store/QuizListStore";
import {authStore} from "../../store/AuthStore";
import {useForm} from "react-hook-form";

export type AddImageForm = {
    image: FileList | null
}


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

    const {register, handleSubmit} = useForm<AddImageForm>({
        defaultValues: {
            image: null
        }
    })



    const onSubmit = (data: AddImageForm) => {
        const formData = new FormData()
        if (typeof data.image !== "string")
        {
            formData.append("image", data.image ? data.image[0] : "")
        }
        return fullPostStore.setPostImage(login!, blogSlug!, postSlug!, formData)
            .then()
    }
    return (
        <div className="fullpost-container">
            <div className="fullpost-title__container">
                <NavLink className="post__user-link" id="fullpost__user-link" to={`/profile/${fullPostStore.post?.blog.owner.login}/`}>
                    <img className="post__user-pic" src={fullPostStore.post?.blog.owner.avatar} alt=""/>
                    {fullPostStore.post?.blog.owner.login}
                </NavLink>
                <h2 className="fullpost-title">{fullPostStore.post?.title}</h2>
            </div>
            <div className="fullpost-description" dangerouslySetInnerHTML={{__html: fullPostStore.post?.description!}}/>
            {
                fullPostStore.post?.blog.owner.login === authStore.user?.name &&
                <form className="addImageToPost" onSubmit={handleSubmit(onSubmit)} style={{marginBottom: '10px', marginTop: '10px'}}>
                    <input className="postImg-file-upload" type="file" accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*" {...register("image")}/>
                    <button className="post-image-add__btn" type="submit">Добавить картинку</button>
                </form>
            }
            {
                fullPostStore.post?.image &&
                <img className="fullPost-image" src={fullPostStore.post?.image} alt=""/>
            }
            {
                fullPostStore.post?.blog.owner.login === authStore.user?.name &&
                <button className="delete-post-btn" onClick={deletePost}>
                    Удалить пост
                </button>
            }
            {
                fullPostStore.post?.blog.owner.login === authStore.user?.name &&
                <div className="create-quiz__container">
                    Введите название нового опроса:
                    <input className="edit-form__field" id="quiz-title-input" type="textarea" onChange={e => setquizTitle(e.target.value)}/>
                    <button className="create-quiz-btn" onClick={() => createQuiz(quizTitle)}>Создать опрос</button>
                </div>
            }
            {
                authStore.isAuth
                    ?
                    <div className="quiz-list">
                        Список опросов:
                        {
                            quizListStore.quizes.results.map((quiz) => {
                                return (
                                    <div className="quiz-list__item-container" key={quiz.slug}>
                                        <NavLink className="quiz-list__item-link" to={`${quiz.slug}`}>
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
                authStore.isAuth
                ?
                    <div className="create-comment__container">
                        Написать комментарий:
                        <input className="edit-form__field comment-text-input" type="textarea" onChange={e => setComment(e.target.value)}/>
                        <button className="create-comment-btn" onClick={() => createComment(comment)}>Создать комментарий</button>
                    </div>
                    :
                    <div className="not-authorizated">
                        Авторизуйтесь, чтобы написать комментарий
                    </div>
            }
            <div className="full-post__commentary-section">
                Комментарии:
                {
                    fullPostStore.comments.results.map(comment => {
                        return (
                            <div className="comment-item" key={comment.id}>
                                <NavLink className="post__user-link" to={`/profile/${comment.owner.login}/`}>
                                    <img className="post__user-pic" src={comment.owner.avatar} alt=""/>
                                    {comment.owner.login}
                                </NavLink>
                                <div className="comment-item__text">
                                    {comment.text}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
})