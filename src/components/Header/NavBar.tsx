import React from 'react';
import { NavLink } from 'react-router-dom';
import {FaUserAlt, FiTrendingUp, GiCheckMark} from "react-icons/all";
import {authStore} from "../../store/AuthStore";
import {observer} from "mobx-react-lite";



export const NavBar = observer(() => {
    const user_me = authStore.user?.name
    return (
        <div className="navbar__container">
            <NavLink className="nav__link" to="popular">
                <FiTrendingUp/>
                Популярное
            </NavLink>
            <NavLink className="nav__link" to={`${user_me}/subscriptions`}>
                <GiCheckMark/>
                Подписки
            </NavLink>
            <NavLink className="nav__link" to="users">
                <FaUserAlt/>
                Пользователи
            </NavLink>
        </div>
    );
})
