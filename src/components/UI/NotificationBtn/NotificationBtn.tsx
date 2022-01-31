import React, {useEffect, useState} from 'react';
import classes from "../NotificationBtn/NotificationBtn.module.css";
import {NotificationBar} from "../../Header/NotificationBar";
import {AnimatePresence} from "framer-motion";
import {MdNotificationsActive} from "react-icons/all";

export const NotificationBtn = () => {

    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {

        const handler = (e: MouseEvent) => {
            if (!(e.target as HTMLElement)?.closest(".NtfBarOpener")){
                setIsOpen(false)
            }
        }
        document.addEventListener("click", handler)
        return () => document.removeEventListener("click", handler)
    }, [])

    return (
        <div className="NtfBarOpener">
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className={classes.NotificationBtn}
            >
               <MdNotificationsActive/>
            </button>
            <AnimatePresence>
                {isOpen && <NotificationBar/>}
            </AnimatePresence>

        </div>
    );
};
