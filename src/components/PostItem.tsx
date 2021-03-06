import React from 'react';
import {PostHeader} from "./PostInner/PostHeader";
import {PostContent} from "./PostInner/PostContent";
import {PostFooter} from "./PostInner/PostFooter";
import {Post} from "../types/PostItem";
import {observer} from "mobx-react-lite";

type Props = {
    post: Post
}


export const PostItem = observer(({post}: Props) => {
    return (
        <div className="post">
            <PostHeader blog={post.blog} creation_date={post.creation_date} tags={post.tags}/>
            <PostContent title={post.title} description={post.description} id={post.id} owner={post.blog.owner.login} slug={post.slug} blogSlug={post.blog.slug}/>
            <PostFooter comments_count={post.comments_count}
                        likes_count={post.likes_count}
                        quizzes_count={post.quizzes_count}
                        views_count={post.views_count}
                        post={post}
            />
        </div>

    );
})
