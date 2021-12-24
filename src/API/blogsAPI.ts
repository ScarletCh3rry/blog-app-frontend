import {api} from "./axios-instance";
import {Blog, FullBlog, Post, Tag} from "../types/PostItem";
import {BlogForm} from "../components/CreateBlogForm";


class BlogsAPI {
    createBlog = (data: BlogForm) => api.post<Blog>('blogs/create-blog/', data).then(res => res.data)
    createPost = (title: string,
                  description: string,
                  tags: Tag[],
                  blog: Blog) => api.post<Post>('blogs/create-post/', {title, tags, description, blog}).then(res => res.data)
    getFullBlog = (login: string, slug: string) => api.get<FullBlog>(`blogs/${login}/${slug}/`).then(res => res.data)
}

export const blogsAPI = new BlogsAPI();