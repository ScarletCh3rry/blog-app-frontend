import React, {useEffect, useState} from 'react';
import classes from './AccBarBtn.module.css'
import {AccountFeatures} from "../../Header/AccountFeatures";
import {AnimatePresence} from "framer-motion";
import {authStore} from "../../../store/AuthStore";
import {observer} from "mobx-react-lite";
import {FaUserCircle} from 'react-icons/all';

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
                {
                    authStore.user?.avatar
                    ?
                        <img style={{
                            height: '45px',
                            width: '45px',
                            borderRadius: '50%',
                            border: '1px solid transparent'
                        }}
                             src={authStore.user?.avatar}
                             alt=""
                        />
                        :
                        <FaUserCircle style={{color: '#e3516f', fontSize: '35px'}}/>
                }
            </button>
            <AnimatePresence>
                {isOpen && <AccountFeatures/>}
            </AnimatePresence>
        </div>
    );
})
