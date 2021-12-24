import React  from 'react';
import {PostList} from "../PostList";
import {TagSearch} from "../TagSearch";

export const FilteredPostList = () => {
    return (
        <div className="post__list-page">
            <PostList/>
            <TagSearch/>
        </div>
    );
};
