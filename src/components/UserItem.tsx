import React from 'react';
import {observer} from "mobx-react-lite";
import {User} from "../types/User";
import { NavLink } from 'react-router-dom';

type Props = {
    user: User
}

export const UserItem = observer(({user}: Props) => {
    return (
        <NavLink to={`/profile/${user.login}`} className="user__profile-link">
            <div className="profile__login">
                {user.login}
            </div>
            {/*<div>*/}
            {/*    <img src={user.avatar} alt=""/>*/}
            {/*</div>*/}
            <div className="profile__date-joined">
                {user.date_joined}
            </div>
            <div className="profile__email">
                {user.email}
            </div>
            <div className="profile__last-login">
                {user.last_login}
            </div >
            <div className="profile__posts-count">
                {user.posts_count}
            </div>
        </NavLink>
    );
})
