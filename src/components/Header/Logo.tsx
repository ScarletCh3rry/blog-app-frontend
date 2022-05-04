import React from 'react';
import { NavLink } from 'react-router-dom';
import logoimg from '../../resources/images/logo.png';

export const Logo = () => {
    return (
        <NavLink className="main__logo" to="">
            <img className="logo__pic" src={logoimg} alt=""/>
            CherryBlog
        </NavLink>
    );
};

