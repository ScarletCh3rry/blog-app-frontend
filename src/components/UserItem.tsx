import React from 'react';
import {observer} from "mobx-react-lite";
import {User} from "../types/User";
import { NavLink } from 'react-router-dom';

type Props = {
    user: User
}

export const UserItem = observer(({user}: Props) => {
    return (
        <div className="profile-link__container">
            <NavLink to={`/profile/${user.login}`} className="user__profile-link">
                <div className="profile-avatar__container">
                    <img className="profile__avatar" id="profile-avatar__adaptive" src={user.avatar} alt="" />
                </div>
                <div className="profile__login profile-info">
                    Логин: {user.login}
                </div>
                <div className="profile__date-joined profile-info">
                    Присоединился к нам<br/>{user.date_joined}
                </div>
                <div className="profile__email profile-info">
                    Почта {user.email}
                </div>
                <div className="profile__last-login profile-info">
                    Последний вход<br/>{user.last_login}
                </div >
                <div className="profile__posts-count profile-info">
                    Постов {user.posts_count}
                </div>
            </NavLink>
        </div>

    );
})
