import {action, makeAutoObservable} from "mobx";
import {blogsAPI} from "../API/blogsAPI";
import {BlogForm} from "../components/CreateBlogForm";
import {Blog} from "../types/PostItem";


class BlogList {


    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    blogs: Blog[] = []
    isLoading = false
    isCreateBlogLoading = false
    error: string | null = null


    fetchBlogs(login: string) {
        this.isLoading = true
        return blogsAPI.getUserBlogs(login)
            .then(
                action(
                    'setBlogs',
                    fetchedBlogs => {
                       this.blogs = fetchedBlogs.results
                    }
                )
            )
            .finally(
                action(
                    'fetchBlogsEnd',
                    () =>{
                        this.isLoading = false
                    }
                )
            )
    }




    createBlog (data: BlogForm){
        this.isCreateBlogLoading = true
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
                    () => this.isCreateBlogLoading = false
                )
            )
    }

}

export const blogListStore = new BlogList()