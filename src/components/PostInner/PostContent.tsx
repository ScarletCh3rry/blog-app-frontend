import React from 'react';
import {Link} from "react-router-dom";

type Props = {
    title: string
    description: string
}

export const PostContent = (props:Props) => {
    return (
        <Link className="post__content" to="">

            <div className="description__container">
                {/*title, description*/}
                <div className="spacer">
                    <h2 className="post__title">
                        {props.title}
                    </h2>
                </div>
                <div className="spacer">
                    <p className="post__description">
                        {props.description}
                    </p>
                </div>
            </div>
        </Link>
    );
};
