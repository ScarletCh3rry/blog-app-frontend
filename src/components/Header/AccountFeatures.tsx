import React from 'react';
import {motion} from 'framer-motion';
import {authStore} from "../../store/AuthStore";
import {observer} from "mobx-react-lite";
import { NavLink } from 'react-router-dom';

export const AccountFeatures = observer(() => {
    return (
        <div>
            <motion.div
                className="AccountFeatures"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                {
                    authStore.isAuth
                        ?
                        <div className="accFeatures__container">
                            <NavLink to="http://localhost:3000"  className="accFeatures__link">
                                Ваш профиль
                            </NavLink>
                            <NavLink to="http://localhost:3000  "  className="accFeatures__link">
                                Настройки
                            </NavLink>
                            <NavLink to="http://localhost:3000" className="accFeatures__link" onClick={e => {
                                authStore.logout()
                                e.preventDefault()
                            }}>
                                Выйти
                            </NavLink>
                        </div>
                        :
                        <div className="accFeatures__container">
                            <a href="http://localhost:3000/login" className="accFeatures__link">
                                Войти
                            </a>
                        </div>
                }
            </motion.div>
        </div>
    );
})
