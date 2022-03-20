import React from 'react';
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {blogListStore} from "../store/BlogListStore";

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
    const onSubmit = (data: BlogForm) => {
        return blogListStore.createBlog(data).then(({slug, owner}) => {
            navigate(`/blogs/${owner.login}/${slug}`)
            closeModal()
        })
    }


    return (
        <div className="create__blog">
            <form className="create__blog-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title">
                    Название Вашего блога
                </label>
                <input type="text"
                       className="form__field-input" {...register('title', {required: 'Введено некорректное название'})}/>
                {errors.title &&
                <div className="auth__error-message wrong__email">{errors.title.message}</div>}
                <label htmlFor="description">
                    Описание блога (о чём ваш блог)
                </label>
                <input type="text"
                       className="form__field-input" {...register('description', {required: 'Введено некорректное описание'})}/>
                {errors.description &&
                <div className="auth__error-message wrong__email">{errors.description.message}</div>}
                <button>
                    Создать блог
                </button>
            </form>
        </div>
    );
};
