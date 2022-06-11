import React from 'react';
import {postListStore, StorePost} from "../../store/PostListStore";
import {observer} from "mobx-react-lite";
import {authStore} from "../../store/AuthStore";
import {useNavigate} from "react-router-dom";
import {AiOutlineComment, AiOutlineEye, MdOutlineQuiz} from 'react-icons/all';
type Props = {
    likes_count: number
    comments_count: number
    quizzes_count: number
    views_count: number
    post: StorePost
}


export const PostFooter = observer((props: Props) => {
    const navigate = useNavigate()
    return (
        <div className="post__footer">
            {/*likes, views, comments, quizzes*/}
            <div className="post__likes post__counter">
                {
                    authStore.isAuth
                    ?
                        <button onClick={() => postListStore.toggleLike(props.post)}
                                className={props.post.is_liked ? "liked post-like-btn" : "post-like-btn"}
                                disabled={props.post.isLoading}  /* props.post.isLoading ? true : false */
                        />
                        :
                        <button onClick={() => navigate("/login")}
                                className={props.post.is_liked ? "liked post-like-btn" : "post-like-btn"}
                                disabled={props.post.isLoading}  /* props.post.isLoading ? true : false */
                        />
                }

                <p className="post__counter-text">
                    {props.likes_count}
                </p>
            </div>
            <div className="post__views post__counter">
                <AiOutlineEye className="post-view-img"/>
                <p className="post__counter-text">
                    {props.views_count}
                </p>
            </div>
            <div className="post__comments post__counter">
                <AiOutlineComment className="post-counter-icon"/>
                <p className="post__counter-text">
                    {props.comments_count}
                </p>
            </div>
            <div className="post__quizzes post__counter">
                <MdOutlineQuiz className="post-counter-icon"/>
                <p className="post__counter-text">
                    {props.quizzes_count}
                </p>
            </div>

        </div>
    );
})