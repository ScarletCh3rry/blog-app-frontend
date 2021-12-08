import React, {useEffect, useState} from 'react';
import classes from './AccBarBtn.module.css'
import profilePicture from '../../../resources/images/profilePicture.png';
import {AccountFeatures} from "../../Header/AccountFeatures";
import {AnimatePresence} from "framer-motion";
/*Dropdown account button*/

export const AccBarBtn = () => {

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {

        const handler = (e: MouseEvent) => {
            if (!(e.target as HTMLElement)?.closest(".AccBarOpener")) {
                setIsOpen(false)
            }
        }
        document.addEventListener("click", handler)
        return () => document.removeEventListener("click", handler)
    }, [])

    return (
        <div
            className="AccBarOpener"
        >
            <button
                className={classes.AccBarBtn}
                onClick={() => setIsOpen(prev => !prev)}
            >
                <img style={{
                    height: '45px',
                    width: '45px',
                    borderRadius: '50%'
                }}
                     src={profilePicture}
                     alt=""
                />{/*temporary fixed image*/}
            </button>
            <AnimatePresence>
                {isOpen && <AccountFeatures/>}
            </AnimatePresence>
        </div>
    );
};
