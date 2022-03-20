import React from 'react';
import {postListStore, StorePost} from "../../store/PostListStore";
import {observer} from "mobx-react-lite";

type Props = {
    likes_count: number
    comments_count: number
    quizzes_count: number
    views_count: number
    post: StorePost
}


export const PostFooter = observer((props: Props) => {
    return (
        <div className="post__footer">
            {/*likes, views, comments, quizzes*/}
            <div className="post__views post__counter">
                {props.views_count}
            </div>
            <div className="post__comments post__counter">
                {props.comments_count}
            </div>
            <div className="post__quizzes post__counter">
                {props.quizzes_count}
            </div>
            <div className="post__likes post__counter" style={{paddingLeft: '30px'}}>
                {props.likes_count}
                <button onClick={() => postListStore.toggleLike(props.post)}
                        className={props.post.is_liked ? "liked" : ""}
                        disabled={props.post.isLoading}  /* props.post.isLoading ? true : false */
                >
                    GIGALIKE
                </button>
            </div>
        </div>
    );
})