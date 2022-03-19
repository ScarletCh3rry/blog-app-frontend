import React from 'react';
import {motion} from 'framer-motion';
import {authStore} from "../../store/AuthStore";
import {observer} from "mobx-react-lite";
import {NavLink} from 'react-router-dom';

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
                            <NavLink to={`blogs/${authStore.user?.name}`} className="accFeatures__link">
                                Ваши блоги
                            </NavLink>
                            <NavLink to="/" className="accFeatures__link">
                                Настройки
                            </NavLink>
                            <NavLink to="/" className="accFeatures__link" onClick={e => {
                                authStore.logout()
                                e.preventDefault()
                            }}>
                                Выйти
                            </NavLink>
                        </div>
                        :
                        <div className="accFeatures__container">
                            <NavLink to="/login" className="accFeatures__link">
                                Войти
                            </NavLink>
                            <NavLink to="/register" className="accFeatures__link">
                                Зарегистрироваться
                            </NavLink>
                        </div>
                }
            </motion.div>
        </div>
    );
})
