import {action, makeAutoObservable} from "mobx";
import {postsAPI} from "../API/postsAPI";
import {Comment, Post} from "../types/PostItem";
import {Paginated} from "../types/Paginated";
import {blogsAPI} from "../API/blogsAPI";


class FullPostStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    comments: Paginated<Comment> = {count: 0, next: null, previous: null, results: []}
    post: Post | null = null
    isLoading: boolean  = false

    fetchFullPost(login: string, blogSlug:string, postSlug: string) {
       this.isLoading = true
       return postsAPI.getPost(login, blogSlug, postSlug)
           .then(
               action(
                   'fetchFullPostend',
                   (post) => this.post = post
               )
           )
           .catch(
               action(
                   'fetchFullPostfailed',
                   (e) => console.log(e)
               )
           )
           .finally(
               action(
                   'fetchFullPostend',
                   () => this.isLoading = false
               )

           )
    }

    deletePost (login: string, blogSlug: string, postSlug: string) {
        return postsAPI.deletePost(login, blogSlug, postSlug)
            .then()
    }

    fetchAllComments (login: string, blogSlug: string, postSlug: string) {
        return postsAPI.getPostComments(login, blogSlug, postSlug)
            .then(
            action(
                'fetchAllCommentsEnd',
                (comments) => this.comments = comments
            )
        )
            .catch(
                action(
                    'fetchCommentsfailed',
                    (e) => console.log(e)
                )
            )
    }

    createComment (login: string, blogSlug: string, postSlug: string, content: string, post: number) {
        return postsAPI.createPostComment(login, blogSlug, postSlug, content, post)
    }

    setPostImage (login: string, blogSlug: string, postSlug: string, image: FormData) {
       return blogsAPI.setPostImage(login, blogSlug, postSlug, image)
           .then(
               action(
                   'postImageFetching',
                   (data) => {
                       this.post!.image = data.image
                   }
               )
           )
    }

}
export const fullPostStore = new FullPostStore()