import React from 'react';
import {NavLink} from "react-router-dom";

type Props = {
    title: string
    description: string
    id: number
    owner: string
    slug: string
    blogSlug: string
}

export const PostContent = (props:Props) => {
    return (
        <NavLink className="post__content" to={`/blogs/${props.owner}/${props.blogSlug}/${props.slug}`}>

            <div className="description__container">
                {/*title, description*/}
                <div className="spacer">
                    <h2 className="post__title">
                        {props.title}
                    </h2>
                </div>
                <div className="spacer post__description" dangerouslySetInnerHTML={{__html: props.description}}>

                    {/*<p className="post__description">*/}
                    {/*    {}*/}
                    {/*</p>*/}
                </div>
            </div>
        </NavLink>
    );
};
