import React from 'react';
import {AccBarBtn} from "../UI/AccBarBtn/AccBarBtn";
import {NotificationBtn} from "../UI/NotificationBtn/NotificationBtn";

export const AccBar = () => {
    return (
        <div className="account__bar">
            <NotificationBtn/>
            <AccBarBtn/>
        </div>
    );
};
