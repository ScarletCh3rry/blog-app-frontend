import React from 'react';
import { Logo } from './Logo';
import {NavBar} from "./NavBar";
import {AccBar} from "./AccBar";

export const Header = () => {
    return (
        <div className='header'>
            <Logo/>
            <NavBar/>
            <AccBar/>
        </div>
    );
};
