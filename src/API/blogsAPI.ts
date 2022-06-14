import {api} from "./axios-instance";
import {Blog, FullBlog, Post} from "../types/PostItem";
import {BlogForm} from "../components/CreateBlogForm";
import {Paginated} from "../types/Paginated";


export type EditPostPayload = {
    title: string,
    description: string,
    tags: number[],
    blogSlug: string,
    image: FileList
}

class BlogsAPI {
    createBlog = (data: BlogForm) => api.post<Blog>('blogs/create-blog/', data).then(res => res.data)
    createPost = (title: string,
                  description: string,
                  tags: number[],
                  blogSlug: string) => api.post<Post>('blogs/create-post/', {title, tags, description, blog: blogSlug}).then(res => res.data)
    setPostImage = (login: string, blogSlug: string, postSlug: string, payload: FormData) => {
        return api.patch<Post>(`blogs/${login}/${blogSlug}/${postSlug}/edit-post/`, payload).then(res => res.data)
    }
    getFullBlog = (login: string, slug: string) => api.get<FullBlog>(`blogs/${login}/${slug}/`).then(res => res.data)
    getUserBlogs = (login: string) => api.get<Paginated<Blog>>(`blogs/${login}/`).then(res => res.data)
    deleteBlog = (login: string, slug: string) => {
        return api.delete(`blogs/${login}/${slug}/delete-blog/`)
    }
}

export const blogsAPI = new BlogsAPI();