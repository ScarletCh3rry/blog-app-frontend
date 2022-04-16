import React, {useEffect} from 'react';
import {fullBlogStore} from "../../store/FullBlogStore";
import {NavLink, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {authStore} from "../../store/AuthStore";
import {FilteredPostList} from "./FilteredPostList";

export const BlogPage = observer( () => {
    const {login, blogSlug} = useParams()
    useEffect(() => {
        fullBlogStore.fetchFullBLog(login!, blogSlug!).then()
    },[]) //eslint-disable-line
    return (
        <div>
            <div>
                {fullBlogStore.blog?.title}
            </div>
            <div>
                {fullBlogStore.blog?.description}
            </div>
            <div>
                <img src={fullBlogStore.blog?.owner.avatar} alt=""/>
            </div>
            <div>
                {fullBlogStore.blog?.owner.login}
            </div>
            <div>
                {/*posts*/}
            </div>
            {
                authStore.user?.name === fullBlogStore.blog?.owner.login &&
                <NavLink to={`/blogs/${fullBlogStore.blog?.slug}/create-post/`}>
                    Создать пост
                </NavLink>
            }
            <FilteredPostList/>
        </div>
    );
})
