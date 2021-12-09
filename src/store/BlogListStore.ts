import {action, makeAutoObservable} from "mobx";
import {Post} from "../types/PostItem";
import {postsAPI} from "../API/postsAPI";


class PostList {

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    posts: Post[] = []
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
}

export const postListStore = new PostList()