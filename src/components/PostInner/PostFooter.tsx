import React from 'react';

export const PostFooter = () => {
    return (
        <div className="post__footer">
            {/*likes, views, comments, quizzes*/}
            <div className="post__views post__counter">
                6546
            </div>
            <div className="post__comments post__counter">
                255
            </div>
            <div className="post__quizzes post__counter">
                4143
            </div>
            <div className="post__likes post__counter">
                6135
            </div>
        </div>
    );
};