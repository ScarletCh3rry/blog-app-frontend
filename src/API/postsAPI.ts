import {api} from "./axios-instance";
import {Post} from "../types/PostItem";

class PostsAPI {
    getAllPosts = () => api.get<Post[]>('blogs/posts/').then(res => res.data)
}

export const postsAPI = new PostsAPI()