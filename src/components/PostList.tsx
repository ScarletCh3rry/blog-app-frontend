import React, {useEffect} from 'react';
import {PostItem} from "./PostItem";
import {postListStore} from "../store/BlogListStore";
import {observer} from "mobx-react-lite";
import {useParams, useSearchParams} from "react-router-dom";



export const PostList = observer(() => {
    // eslint-disable-next-line
    const [query, setQuery] = useSearchParams()
    const {login} = useParams()
    useEffect(() => {
        postListStore.fetchPosts(query.getAll('tags'), login, query.get('search')).then()
    }, [query]) //eslint-disable-line
    return (
        <div className="post__list">
            {postListStore.posts.map(post => <PostItem key={post.id} post={post}/>)}
        </div>
    );
})