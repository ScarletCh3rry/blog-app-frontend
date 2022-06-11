import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {blogListStore} from "../store/BlogListStore";
import {authStore} from "../store/AuthStore";

export type BlogForm = {
    title: string
    description: string
}
type Props = {
    closeModal: () => void
}

export const CreateBlogForm = ({closeModal}: Props) => {

    const {register, handleSubmit, formState: {errors}} = useForm<BlogForm>()

    const navigate = useNavigate()

    const [errorValue, setErrorValie] = useState('')


    const onSubmit = (data: BlogForm) => {
        return blogListStore.createBlog(data).then(({slug, owner}) => {
            navigate(`/blogs/${owner.login}/${slug}`)
            closeModal()
        })
            .catch((e) => {
                setErrorValie(e.toString())
            })
    }

    return (
        <div className="create__blog">
            {
                authStore.isAuth
                ?
                    <form className="create__blog-form" onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="title" className="create-blog-label">
                            Название Вашего блога
                        </label>
                        <input type="text"
                               className="form__field-input edit-form__field" {...register('title', {required: 'Введено некорректное название'})}/>
                        {errors.title &&
                        <div className="auth__error-message wrong__email">{errors.title.message}</div>}
                        <label htmlFor="description" className="create-blog-label">
                            Описание блога (о чём ваш блог)
                        </label>
                        <input type="text"
                               className="form__field-input edit-form__field" {...register('description', {required: 'Введено некорректное описание'})}/>
                        {errors.description &&
                        <div className="auth__error-message wrong__email">{errors.description.message}</div>}
                        <button className="create-blog-form-btn">
                            Создать блог
                        </button>
                        <div className="creating-error">
                            {errorValue}
                        </div>
                    </form>
                    :
                    <div className="not-authorizated">
                        Чтобы выполнить данное действие авторизуйтесь
                    </div>
            }
        </div>
    );
};
