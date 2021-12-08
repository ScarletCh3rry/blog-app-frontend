import React, {useEffect, useState} from 'react';
import classes from "../NotificationBtn/NotificationBtn.module.css";
import notificationIcon from "../../../resources/images/notificationIcon.png";
import {NotificationBar} from "../../Header/NotificationBar";
import {AnimatePresence} from "framer-motion";

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
        <div
            className="NtfBarOpener"
        >
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className={classes.NotificationBtn}
            >
                <img style={{
                    maxWidth: '40px',
                    maxHeight: '40px',
                    minWidth: '40px',
                    minHeight: '40px',
                    borderRadius: '50%'
                }}
                     src={notificationIcon}
                     alt=""
                />{/*fixed notification image*/}
            </button>
            <AnimatePresence>
                {isOpen && <NotificationBar/>}
            </AnimatePresence>

        </div>
    );
};
