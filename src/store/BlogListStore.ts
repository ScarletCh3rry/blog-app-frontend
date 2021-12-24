import {action, makeAutoObservable} from "mobx";
import {Blog, Post, Tag} from "../types/PostItem";
import {postsAPI} from "../API/postsAPI";
import {blogsAPI} from "../API/blogsAPI";
import {BlogForm} from "../components/CreateBlogForm";

export type StorePost = Post & { isLoading?: boolean }

class PostList {

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    posts: StorePost[] = []
    isLoading = false
    error: string | null = null


    fetchPosts(tags: string[], owner: string | undefined) {
        this.isLoading = true
        return postsAPI.getAllPosts(tags, owner)
            .then(
                action(
                    'setPosts',
                    paginatedPosts => this.posts = paginatedPosts.results // TODO: add count
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

    createPost (title: string, description: string, tags: Tag[], blog: Blog){
        this.isLoading = true
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
                    () => this.isLoading = false
                )
            )
    }

    createBlog (data: BlogForm){
        this.isLoading = true
        return blogsAPI.createBlog(data)
            .catch(
                action(
                    'creatingBlogFailed',
                    (e) => {
                        console.log(e)
                        throw new Error('Oshibka :)')
                    }
                )
            )
            .finally(
                action(
                    'creatingBlogEnd',
                    () => this.isLoading = false
                )
            )
    }
}

export const postListStore = new PostList()