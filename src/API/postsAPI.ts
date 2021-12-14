import {api} from "./axios-instance";
import {Post, PostRelations} from "../types/PostItem";

class PostsAPI {
    getAllPosts = () => api.get<Post[]>('blogs/posts/').then(res => res.data)
    setPostLike = (postId:number, like:boolean) => api.put<PostRelations>(`blogs/like-posts/${postId}/`, {like}).then(res => res.data)
}


export const postsAPI = new PostsAPI()