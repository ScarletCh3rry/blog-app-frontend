import React, {useEffect} from 'react';
import {PostItem} from "./PostItem";
import {postListStore} from "../store/BlogListStore";
import {observer} from "mobx-react-lite";


export const PostList = observer(() => {
    useEffect(() => {
        postListStore.fetchPosts().then()
    }, [])
    return (
        <div className="post__list">
            {postListStore.posts.map(post => <PostItem key={post.id} post={post}/>)}
        </div>
    );
})