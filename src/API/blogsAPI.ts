import {api} from "./axios-instance";
import {Blog, FullBlog, Post} from "../types/PostItem";
import {BlogForm} from "../components/CreateBlogForm";
import {Paginated} from "../types/Paginated";


class BlogsAPI {
    createBlog = (data: BlogForm) => api.post<Blog>('blogs/create-blog/', data).then(res => res.data)
    createPost = (title: string,
                  description: string,
                  tags: number[],
                  blogSlug: string) => api.post<Post>('blogs/create-post/', {title, tags, description, blog: blogSlug}).then(res => res.data)
    getFullBlog = (login: string, slug: string) => api.get<FullBlog>(`blogs/${login}/${slug}/`).then(res => res.data)
    getUserBlogs = (login: string) => api.get<Paginated<Blog>>(`blogs/${login}/`).then(res => res.data)
}

export const blogsAPI = new BlogsAPI();