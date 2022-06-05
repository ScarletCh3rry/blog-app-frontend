import React, {useEffect} from 'react';
import {blogListStore} from "../../store/BlogListStore";
import {observer} from "mobx-react-lite";
import {NavLink, useParams} from "react-router-dom";

export const UserBlogs = observer(() => {
    const {login} = useParams()
    useEffect(() => {
        blogListStore.fetchBlogs(login!).then()
    }, []) //eslint-disable-line
    return (

        <div className="user-blogs-list">
            {
                blogListStore.blogs.map(blog => <NavLink to={`/blogs/${blog.owner.login}/${blog.slug}`}
                                                         key={blog.slug}
                                                         className="blog-list-item">
                    <div className="blog-list-item__inner">
                        Создатель: {blog.owner.login}
                    </div>
                    <div className="blog-list-item__inner">
                        Название: {blog.title}
                    </div>
                    <div className="blog-list-item__inner">
                        Описание: {blog.description}
                    </div>
                </NavLink>)

            }
            {/*<FilteredPostList/>*/}
        </div>
    );
})
