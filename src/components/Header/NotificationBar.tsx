import React from 'react';
import {motion} from 'framer-motion';
import {NtfSettingsBtn} from "../UI/NtfSettingsBtn/NtfSettingsBtn";
import {NotificationItem} from "./NotificationItem";
export const NotificationBar = () => {
    return (
        <motion.div
            className="NotificationBar"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <div className="NtfSettings__container">
                <h3 style={{marginLeft: '12px'}}>Ваши уведомления</h3>
                <NtfSettingsBtn/>
            </div>
            <div className="notifications__container">
                <NotificationItem/>
            </div>

        </motion.div>
    );
};
