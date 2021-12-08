import React from 'react';
import { NavLink } from 'react-router-dom';
import {MyInput} from "../UI/myInput/MyInput";

export const NavBar = () => {
    return (
        <div className="navbar__container">
            <NavLink className="nav__link" to="">
                Популярное
            </NavLink>
            <NavLink className="nav__link" to="">
                Подписки
            </NavLink>
            <NavLink className="nav__link" to="">
                Пользователи
            </NavLink>
            <MyInput/>
        </div>
    );
};
