import React, {useEffect, useState} from 'react';
import {tagListStore} from "../../store/TagListStore";
import {observer} from "mobx-react-lite";
import {postListStore} from "../../store/BlogListStore";
import { useParams } from 'react-router-dom';
import {useForm} from "react-hook-form";

export type CreatePostForm = {
    title: string
    description: string
}


export const CreatePostPage = observer(() => {

    useEffect(() => {
        tagListStore.fetchTags().then()
    }, [])

    const {blogId} = useParams()

    const [selectedTags, setSelectedTags] = useState<number[]>([])

    const addTag = (id:number) => {
         setSelectedTags([...selectedTags, id])
    }

    const removeTag = (id:number) => {
        setSelectedTags(selectedTags.filter((tag) => tag !== id))
    }

    const onSubmit = (data: CreatePostForm) => {
        return postListStore.createPost(data.title, data.description, selectedTags, +blogId!)
    }

    const {register, handleSubmit, formState: {errors}} = useForm<CreatePostForm>()

    return (
        <div className="create__post">
            <form className="create__post-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="create__post__title">
                    <input {...register('title', {required: 'Введено некорректное название'})}
                           className="form__field-input"/>
                    {errors.title && <div className="create__error-message wrong__title">{errors.title.message}</div>}
                </div>
                <div className="create__post__description">
                    <textarea {...register('description', {required: 'Введено некорректное описание'})}
                           className="form__field-input"/>
                    {errors.description && <div className="create__error-message wrong__description">{errors.description.message}</div>}
                </div>
                <div className="create__post__tags">
                    {
                        tagListStore.tags.map(
                            (tag) => {
                                const isActive = selectedTags.includes(tag.id)
                                return(
                                    <button
                                        className={isActive ? 'active tag__select-button' : 'tag__select-button'}
                                        onClick={() => isActive ? removeTag(tag.id) : addTag(tag.id)}
                                        key={tag.id}
                                        type='button'
                                    >
                                        {tag.name}
                                    </button>
                                )
                            }
                        )
                    }
                </div>
                <button>
                    Создать пост :)
                </button>
            </form>
        </div>
    );
})
