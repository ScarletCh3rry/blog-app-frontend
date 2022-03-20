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
                                                         style={{color: '#fff', textDecoration: 'none'}}>
                    {blog.owner.login} {blog.owner.avatar} {blog.description} {blog.slug} {blog.title}</NavLink>)

            }
            {/*<FilteredPostList/>*/}
        </div>
    );
})
