import React from 'react';
import { NavLink } from 'react-router-dom';
import {FaUserAlt, GiCheckMark} from "react-icons/all";
import {authStore} from "../../store/AuthStore";
import {observer} from "mobx-react-lite";



export const NavBar = observer(() => {

    const user_me = authStore.user?.name

    const notAuthPath = "/login"

    const authPathSubs = `/${user_me}/subscriptions`

    return (
        <div className="navbar__container">
            <NavLink className="nav__link" to={authStore.isAuth
            ?
                authPathSubs
            :
            notAuthPath}>
                <GiCheckMark/>
                Подписки
            </NavLink>
            <NavLink className="nav__link" to={
                authStore.isAuth
                ?
                    "/users"
                    :
                    notAuthPath
            }>
                <FaUserAlt/>
                Пользователи
            </NavLink>
        </div>
    );
})
