import React, {useEffect, useRef} from 'react';
import {PostList} from "../PostList";
import {TagSearch} from "../TagSearch";
import {useParams, useSearchParams} from "react-router-dom";
import {postListStore} from "../../store/PostListStore";
import {useObserver} from "../../hooks/useObserver";
import {observer} from "mobx-react-lite";
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

export const FilteredPostList = observer(() => {
    // eslint-disable-next-line
    const [query, setQuery] = useSearchParams()
    const {login, blogSlug} = useParams()
    const observerElement = useRef<HTMLDivElement>(null)
    const totalPages = postListStore.pagesCount
    useObserver(observerElement, postListStore.currentPage < totalPages, postListStore.isSubloading || postListStore.isFirstLoading, postListStore.setNextPage)
    const search = useDebouncedValue(query.get('search'))

    useEffect(() => {
        postListStore.fetchPosts(query.getAll('tags'), login, search, true, blogSlug).then()
    }, [query.getAll('tags').join(' '), login, search])//eslint-disable-line

    useEffect(() => {
        if (postListStore.currentPage !== 1) {
            postListStore.fetchPosts(query.getAll('tags'), login, search, false, blogSlug).then()
        }
    }, [postListStore.currentPage]) //eslint-disable-line

    return (
        <div className="post__list-page">
            <TagSearch/>
            <PostList isFirstLoading={postListStore.isFirstLoading} isSubloading={postListStore.isSubloading} observerElement={observerElement} postList={postListStore.posts}/>
        </div>
    );
})
