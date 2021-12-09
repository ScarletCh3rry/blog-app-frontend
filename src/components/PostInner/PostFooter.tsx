import React from 'react';

type Props = {
    likes_count: number
    comments_count: number
    quizzes_count: number
    views_count: number
}

export const PostFooter = (props:Props) => {
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
            <div className="post__likes post__counter">
                {props.likes_count}
            </div>
        </div>
    );
};