import React from 'react';
import { NavLink } from 'react-router-dom';
import {FaUserAlt, FiTrendingUp, GiCheckMark} from "react-icons/all";

export const NavBar = () => {
    return (
        <div className="navbar__container">
            <NavLink className="nav__link" to="popular">
                <FiTrendingUp/>
                Популярное
            </NavLink>
            <NavLink className="nav__link" to="subscribers">
                <GiCheckMark/>
                Подписки
            </NavLink>
            <NavLink className="nav__link" to="users">
                <FaUserAlt/>
                Пользователи
            </NavLink>
        </div>
    );
};
