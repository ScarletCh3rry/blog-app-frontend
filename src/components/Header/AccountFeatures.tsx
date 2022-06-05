import React from 'react';
import {motion} from 'framer-motion';
import {authStore} from "../../store/AuthStore";
import {observer} from "mobx-react-lite";
import {NavLink, useNavigate} from 'react-router-dom';

export const AccountFeatures = observer(() => {

    const navigate = useNavigate()

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
                            <NavLink to={`/blogs/${authStore.user?.name}`} className="accFeatures__link">
                                Ваши блоги
                            </NavLink>
                            <NavLink to={`/profile/${authStore.user?.name}`} className="accFeatures__link">
                                Ваш профиль
                            </NavLink>
                            <NavLink to="/" className="accFeatures__link" onClick={e => {
                                authStore.logout()
                                navigate('/login')
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
