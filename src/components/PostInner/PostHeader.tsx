import React from 'react';
import {Link} from "react-router-dom";
import profilePicture from "../../resources/images/profilePicture.png";

export const PostHeader = () => {
    return (
        <div className="post__header">
            {/*tags, user, date*/}
            <div className="post__user-info">
                <Link className="post__user-link" to="">
                    <img className="post__user-pic" src={profilePicture} alt=""/>
                    Qewerwewqqweqew
                </Link>
                <div className="post__date">
                    <time dateTime="2021-12-06T19:55:28+03:00" className="post_datetime">22 часа назад</time>
                </div>
            </div>
            <div className="post__tags">
                <Link to="" className="post__tag-link">
                    Детский снюс
                </Link>
                <Link to="" className="post__tag-link">
                    Взрывная шайба
                </Link>
            </div>
        </div>
    );
};
