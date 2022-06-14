import React, {useEffect, useRef} from 'react';
import {postListStore} from "../../store/PostListStore";
import {observer} from "mobx-react-lite";
import {useParams, useSearchParams} from "react-router-dom";
import {useObserver} from "../../hooks/useObserver";
import {PostList} from "../PostList";
import {TagSearch} from "../TagSearch";

export const SubscriptionsPage = observer(() => {
    // eslint-disable-next-line
    const [query, setQuery] = useSearchParams()

    // @ts-ignore
    const {login} = useParams<{login: string}>()
    const observerElement = useRef<HTMLDivElement>(null)
    const totalPages = postListStore.pagesCount
    useObserver(observerElement, postListStore.currentPage < totalPages, postListStore.isSubloading || postListStore.isFirstLoading, postListStore.setNextPage)

    useEffect(() => {
        postListStore.fetchSubscribedPosts(login, true, query.get('search'), query.getAll('tags')).then()

    }, [query, login]) //eslint-disable-line

    useEffect(() => {
        if (postListStore.currentPage !== 1) {
            postListStore.fetchSubscribedPosts(login, false, query.get('search'), query.getAll('tags')).then()
        }
    }, [postListStore.currentPage]) //eslint-disable-line

    return (
        <div className="subscriptions_page post__list-page">
            <TagSearch/>
            <PostList isFirstLoading={postListStore.isFirstLoading} isSubloading={postListStore.isSubloading} observerElement={observerElement} postList={postListStore.posts}/>
        </div>
    );
});