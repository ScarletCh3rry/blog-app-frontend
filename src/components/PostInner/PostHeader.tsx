import React from 'react';
import {Link} from "react-router-dom";
import {Blog, Tag} from "../../types/PostItem";

type Props = {
    tags: Tag[]
    creation_date: string
    blog: Blog

}

export const PostHeader = (props:Props) => {
    return (
        <div className="post__header">
            {/*tags, user, date*/}
            <div className="post__user-info">
                <Link className="post__user-link" to="">
                    <img className="post__user-pic" src={props.blog.owner.avatar} alt=""/>
                    {props.blog.owner.login}
                </Link>
                <div className="post__date">
                    <time dateTime="2021-12-06T19:55:28+03:00" className="post_datetime">{props.creation_date}</time>
                </div>
            </div>
            <div className="post__tags">
                {props.tags.map(tag =>
                    <Link to="" className="post__tag-link" key={tag.id}>
                        {tag.name}
                    </Link>
                )}
            </div>
        </div>
    );
};
