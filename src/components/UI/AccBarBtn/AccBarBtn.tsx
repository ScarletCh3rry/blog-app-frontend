import React, {useEffect, useState} from 'react';
import classes from './AccBarBtn.module.css'
import {AccountFeatures} from "../../Header/AccountFeatures";
import {AnimatePresence} from "framer-motion";
import {authStore} from "../../../store/AuthStore";
import {observer} from "mobx-react-lite";

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
                    borderRadius: '50%',
                    border: '1px solid transparent'
                }}
                     src={authStore.user?.avatar ? authStore.user?.avatar : 'http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png'}
                     alt=""
                />
            </button>
            <AnimatePresence>
                {isOpen && <AccountFeatures/>}
            </AnimatePresence>
        </div>
    );
})
