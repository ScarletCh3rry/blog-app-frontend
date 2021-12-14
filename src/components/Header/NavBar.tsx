import React from 'react';
import { NavLink } from 'react-router-dom';
import {MyInput} from "../UI/myInput/MyInput";

export const NavBar = () => {
    return (
        <div className="navbar__container">
            <NavLink className="nav__link" to="popular">
                Популярное
            </NavLink>
            <NavLink className="nav__link" to="subscribers">
                Подписки
            </NavLink>
            <NavLink className="nav__link" to="users">
                Пользователи
            </NavLink>
            <MyInput/>
        </div>
    );
};
