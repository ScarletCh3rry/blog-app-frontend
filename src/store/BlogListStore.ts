import {action, makeAutoObservable} from "mobx";
import {Post} from "../types/PostItem";
import {postsAPI} from "../API/postsAPI";
import {blogsAPI} from "../API/blogsAPI";
import {BlogForm} from "../components/CreateBlogForm";
import {getPagesCount} from "../utils/getPagesCount";

export type StorePost = Post & { isLoading?: boolean }

class PostList {

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    posts: StorePost[] = []
    isLoading = false
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

    fetchPosts(tags: string[], owner: string | undefined, search: string | null) {
        this.isLoading = true
        return postsAPI.getAllPosts(this.currentPage, tags, owner, search)
            .then(
                action(
                    'setPosts',
                    paginatedPosts => {
                        this.posts = [...this.posts, ...paginatedPosts.results]
                        this.totalPostsCount = paginatedPosts.count
                    } // TODO: add count
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

    createPost (title: string, description: string, tags: number[], blog: number){
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