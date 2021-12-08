import React from 'react';
import {PostHeader} from "./PostInner/PostHeader";
import {PostContent} from "./PostInner/PostContent";
import {PostFooter} from "./PostInner/PostFooter";

export const PostItem = () => {
    return (
        <div className="post">
            <PostHeader/>
            <PostContent/>
            <PostFooter/>
        </div>
    );
};
