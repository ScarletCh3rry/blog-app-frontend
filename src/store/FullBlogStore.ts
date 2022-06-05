import {action, makeAutoObservable} from "mobx";
import {FullBlog} from "../types/PostItem";
import {blogsAPI} from "../API/blogsAPI";


class FullBlogStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    blog: FullBlog | null = null
    isLoading = false

    fetchFullBLog(login: string, slug: string) {
        this.isLoading = true
        return blogsAPI.getFullBlog(login, slug)
            .then(
                action(
                    'setFullBlog',
                    (blog) => this.blog = blog
                )
            )
            .catch(
                action(
                    'fullBlogFetchingFailed',
                    (e) =>console.log(e)
                )
            )
            .finally(
                action(
                    'fullBlogFetchingEnd',
                    () => this.isLoading = false
                )
            )
    }

    deleteBlog(login: string, blogSlug: string) {
        return blogsAPI.deleteBlog(login, blogSlug)
    }
}

export const fullBlogStore = new FullBlogStore()