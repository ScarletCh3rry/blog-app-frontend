import {action, makeAutoObservable} from "mobx";
import {Post} from "../types/PostItem";
import {postsAPI} from "../API/postsAPI";

export type StorePost = Post & { isLoading?: boolean }

class PostList {

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    posts: StorePost[] = []
    isLoading = false
    error: string | null = null


    fetchPosts() {
        this.isLoading = true
        return postsAPI.getAllPosts()
            .then(
                action(
                    'setPosts',
                    posts => this.posts = posts
                )
            )
            .finally(
                action(
                    'fetchPostsEnd',
                    () => this.isLoading = false
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
}

export const postListStore = new PostList()