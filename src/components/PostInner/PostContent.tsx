import React from 'react';
import {NavLink} from "react-router-dom";

type Props = {
    title: string
    description: string
}

export const PostContent = (props:Props) => {
    return (
        <NavLink className="post__content" to="">

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
        </NavLink>
    );
};
