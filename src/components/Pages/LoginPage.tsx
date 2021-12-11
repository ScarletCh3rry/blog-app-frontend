import React from 'react';
import {AuthPage} from "./AuthPage";
import {authStore} from "../../store/AuthStore";

export const LoginPage = () => {
    return (
        <div>
            <AuthPage isRegister={false} onSubmit={authStore.login}/>
        </div>
    );
};

