import React, {useEffect, useState} from 'react';
import classes from './AccBarBtn.module.css'
import {AccountFeatures} from "../../Header/AccountFeatures";
import {AnimatePresence} from "framer-motion";
import {authStore} from "../../../store/AuthStore";
import {observer} from "mobx-react-lite";
/*Dropdown account button*/

export const AccBarBtn = observer(() => {
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
                     src={authStore.user?.avatar}
                     alt=""
                />
            </button>
            <AnimatePresence>
                {isOpen && <AccountFeatures/>}
            </AnimatePresence>
        </div>
    );
})
