import {action, makeAutoObservable} from "mobx";
import {postsAPI} from "../API/postsAPI";
import {Post} from "../types/PostItem";


class FullPostStore {
    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

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


}
export const fullPostStore = new FullPostStore()