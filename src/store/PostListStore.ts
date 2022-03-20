import {action, makeAutoObservable} from "mobx";
import {Post} from "../types/PostItem";
import {postsAPI} from "../API/postsAPI";
import {blogsAPI} from "../API/blogsAPI";
import {getPagesCount} from "../utils/getPagesCount";

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

    createPost (title: string, description: string, tags: number[], blog: number){
        this.isCreatePostLoading = true
        return blogsAPI.createPost(title, description, tags, blog)
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