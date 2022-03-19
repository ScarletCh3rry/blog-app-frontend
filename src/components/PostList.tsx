import React, {useEffect, useRef} from 'react';
import {PostItem} from "./PostItem";
import {postListStore} from "../store/BlogListStore";
import {observer} from "mobx-react-lite";
import {createSearchParams, useParams, useSearchParams} from "react-router-dom";
import {useObserver} from "../hooks/useObserver";



export const PostList = observer(() => {
    // eslint-disable-next-line
    const [query, setQuery] = useSearchParams()
    const {login} = useParams()
    const observerElement = useRef<HTMLDivElement>(null)
    const totalPages = postListStore.pagesCount
    useObserver(observerElement, postListStore.currentPage < totalPages, postListStore.isLoading, postListStore.setNextPage)

    useEffect(() => {
        postListStore.fetchPosts(query.getAll('tags'), login, query.get('search')).then()
    }, [query, postListStore.currentPage]) //eslint-disable-line


    return (
        <div className="post__list">
            {postListStore.posts.map(post => <PostItem key={post.id} post={post}/>)}
            <div ref={observerElement} style={{height: 1, width: 10}}/>
            {postListStore.isLoading &&
                <div>Загрузка..</div>
            }

        </div>
    );
})