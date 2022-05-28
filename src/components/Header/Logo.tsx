import React from 'react';
import { GiCherry } from 'react-icons/all';
import { NavLink } from 'react-router-dom';

export const Logo = () => {
    return (
        <NavLink className="main__logo" to="">
            <GiCherry className="main__logo-pic"/>
            CherryBlog
        </NavLink>
    );
};

