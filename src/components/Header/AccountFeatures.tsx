import React from 'react';
import {motion} from 'framer-motion';

export const AccountFeatures = () => {
    return (
        <div>
            <motion.div
                className="AccountFeatures"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                <div className="accFeatures__container">
                    <a href="http://google.com" className="accFeatures__link">
                        Ваш профиль
                    </a>
                    <a href="http://google.com" className="accFeatures__link">
                        Настройки
                    </a>
                    <a href="http://google.com" className="accFeatures__link">
                        Выйти
                    </a>
                </div>
            </motion.div>
        </div>
    );
};
