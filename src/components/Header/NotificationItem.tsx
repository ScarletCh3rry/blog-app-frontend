import React from 'react';
import { Link } from 'react-router-dom';
import profilePicture from "../../resources/images/profilePicture.png";

export const NotificationItem = () => {
    return (
        <div className="NotificationItem">
             <Link to="" className="notification__link">
                <div className="ntfImg__container">
                    <img style={{height: '45px', width: '45px', borderRadius: '50%'}}
                         src={profilePicture}
                         alt=""
                    />
                </div>
                <div>
                    <h3 style={{color: "#000"}}>Заголовок</h3>
                    <p style={{color: "#000"}}>Описание поста. Описание поста. Описание поста. </p>
                </div>
            </Link>
        </div>
    );
};
