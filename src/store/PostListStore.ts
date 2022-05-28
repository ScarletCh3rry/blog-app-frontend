import {action, makeAutoObservable} from "mobx";
import {Post} from "../types/PostItem";
import {postsAPI} from "../API/postsAPI";
import {blogsAPI} from "../API/blogsAPI";
import {getPagesCount} from "../utils/getPagesCount";
import {userProfileStore} from "./UserProfileStore";

export type StorePost = Post & { isLoading?: boolean }

class PostList {

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    posts: StorePost[] = []
    isFirstLoading = false
    isSubloading = false
    isCreatePostLoading = false
    error: string | null = null
    totalPostsCount: number | null = null
    currentPage: number = 1

    get pagesCount() {
        if (!this.totalPostsCount) return 0
        return getPagesCount(this.totalPostsCount, 10)
    }
    setNextPage() {
        this.currentPage ++
    }

    fetchPosts(tags: string[], owner: string | undefined, search: string | null, isFirstLoad: boolean, blogSlug: string | undefined) {
        if (isFirstLoad) {
            this.currentPage = 1
            this.isFirstLoading = true
        }
        else {
            this.isSubloading = true
        }
        return postsAPI.getAllPosts(this.currentPage, tags, owner, search, blogSlug)
            .then(
                action(
                    'setPosts',
                    paginatedPosts => {
                        if (isFirstLoad){
                            this.posts = paginatedPosts.results
                        }
                        else {
                            this.posts = [...this.posts, ...paginatedPosts.results]
                        }
                        this.totalPostsCount = paginatedPosts.count
                    } // TODO: add count

                )
            )
            .finally(
                action(
                    'fetchPostsEnd',
                    () =>{
                        this.isFirstLoading = false
                        this.isSubloading = false
                    }
                )
            )
    }

    fetchSubscribedPosts(user: string, isFirstLoad:boolean, search: string | null, tags: string[]) {
        if (isFirstLoad) {
            this.currentPage = 1
            this.isFirstLoading = true
        }
        else {
            this.isSubloading = true
        }
        return postsAPI.getSubscribedPosts(this.currentPage, user, search, tags)
            .then(
                action(
                    'setSubscribedPosts',
                    paginatedPosts => {
                        if (isFirstLoad){
                            this.posts = paginatedPosts.results
                        }
                        else {
                            this.posts = [...this.posts, ...paginatedPosts.results]
                        }
                        this.totalPostsCount = paginatedPosts.count
                    } // TODO: add count
                )
            )
            .finally(
                action(
                    'fetchSubscribedPostsEnd',
                    () =>{
                        this.isFirstLoading = false
                        this.isSubloading = false
                    }
                )
            )
    }

    setSubscription(user_you_subscribed_to: string, user_who_subscribed: string, subscription_status:boolean) {
        return postsAPI.setSubscription(user_who_subscribed, user_you_subscribed_to, subscription_status)
            .then(action((data) => {
                userProfileStore.user!.subscription_status = data.subscription_status
                })
            )

    }

    toggleLike(post: StorePost) {
        if (post.isLoading)
            return
        post.isLoading = true
        if (post.is_liked){
            post.is_liked = false
            post.likes_count --
        }
        else{
            post.is_liked = true
            post.likes_count++
        }

        return postsAPI.setPostLike(post.id, post.is_liked)
            .catch(
                action(
                    'failedSettingLike',
                    () => {
                        if (post.is_liked){
                            post.is_liked = false
                            post.likes_count --
                        }
                        else{
                            post.is_liked = true
                            post.likes_count++
                        }
                    }
                )
            )
            .finally(
                action(
                    'setLikeEnd',
                    () => post.isLoading = false
                )
            )
    }

    createPost (title: string, description: string, tags: number[], blogSlug: string){
        this.isCreatePostLoading = true
        return blogsAPI.createPost(title, description, tags, blogSlug)
            .catch(
                action(
                    'creatingPostFailed',
                    (e) => console.log(e)
                )
            )
            .finally(
                action(
                    'creatingPostEnd',
                    () => this.isCreatePostLoading = false
                )
            )
    }



}

export const postListStore = new PostList()