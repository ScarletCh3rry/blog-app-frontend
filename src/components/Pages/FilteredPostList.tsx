import React, {useCallback, useEffect, useRef} from 'react';
import {PostList} from "../PostList";
import {TagSearch} from "../TagSearch";
import {useParams, useSearchParams} from "react-router-dom";
import {postListStore} from "../../store/PostListStore";
import {useObserver} from "../../hooks/useObserver";
import {observer} from "mobx-react-lite";
import {debounce} from "../../utils/debounce";

export const FilteredPostList = observer(() => {
    // eslint-disable-next-line
    const [query, setQuery] = useSearchParams()
    const {login, blogSlug} = useParams()
    const observerElement = useRef<HTMLDivElement>(null)
    const totalPages = postListStore.pagesCount
    useObserver(observerElement, postListStore.currentPage < totalPages, postListStore.isSubloading || postListStore.isFirstLoading, postListStore.setNextPage)


    const debouncedFetch = useCallback(debounce(() => { //eslint-disable-line
        postListStore.fetchPosts(query.getAll('tags'), login, query.get('search'), true, blogSlug).then()
    }, 700), [])



    useEffect(() => {
        postListStore.fetchPosts(query.getAll('tags'), login, query.get('search'), true, blogSlug).then()
    }, [query.getAll('tags').join(' '), login])//eslint-disable-line


    useEffect(() => {
        debouncedFetch()
    }, [query.get('search')]) //eslint-disable-line

    useEffect(() => {
        if (postListStore.currentPage !== 1) {
            postListStore.fetchPosts(query.getAll('tags'), login, query.get('search'), false, blogSlug).then()
        }
    }, [postListStore.currentPage]) //eslint-disable-line

    return (
        <div className="post__list-page">
            <PostList isFirstLoading={postListStore.isFirstLoading} isSubloading={postListStore.isSubloading} observerElement={observerElement} postList={postListStore.posts}/>
            <TagSearch/>
        </div>
    );
})
