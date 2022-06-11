import React, {useEffect} from 'react';
import {fullBlogStore} from "../../store/FullBlogStore";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {authStore} from "../../store/AuthStore";
import {FilteredPostList} from "./FilteredPostList";

export const BlogPage = observer( () => {
    const {login, blogSlug} = useParams()
    useEffect(() => {
        fullBlogStore.fetchFullBLog(login!, blogSlug!).then()
    },[]) //eslint-disable-line

    const navigate = useNavigate()

    const deleteBlog = (login: string, blogSlug: string) => {
        fullBlogStore.deleteBlog(login, blogSlug)
            .then(() => navigate(`/blogs/${login}`))
    }

    return (
        <div className="blog-page">
            <div className="blog-page-info__container">
                <div className="blog-page-info">
                    Название блога: {fullBlogStore.blog?.title}
                </div>
                <div className="blog-page-info">
                    Описание блога: {fullBlogStore.blog?.description}
                </div>
                {/*<div>*/}
                {/*    <img src={fullBlogStore.blog?.owner.avatar} alt=""/>*/}
                {/*</div>*/}
                <div className="blog-page-info">Блог создал: {fullBlogStore.blog?.owner.login}</div>
                {
                    authStore.user?.name === fullBlogStore.blog?.owner.login &&
                    <div className="blog-page-info" id="create-post-link__container">
                        <NavLink className="create-post-link" to={`/blogs/${fullBlogStore.blog?.slug}/create-post/`}>
                            Создать пост
                        </NavLink>
                        <button className="delete-blog-btn" onClick={() => deleteBlog(login!, blogSlug!)}>
                            Удалить блог
                        </button>
                    </div>

                }
            </div>
            <FilteredPostList/>
        </div>
    );
})
