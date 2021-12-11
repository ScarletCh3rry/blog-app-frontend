import React from 'react';
import {useForm} from "react-hook-form";

export type AuthForm = {
    login: string
    password: string
}

type Props = {
    isRegister: boolean
    onSubmit: (data: AuthForm) => Promise<any>
}

export const AuthPage = (props: Props) => {
    const {register, handleSubmit, formState: {errors}} = useForm<AuthForm>()

    return (
        <div className="auth__layout">
            <div className="auth__form-container">
                <div className="auth__form-title">
                    Войдите в аккаунт
                </div>
                <form action="" className="auth__form" onSubmit={handleSubmit(props.onSubmit)}>
                    <div className="form__field">
                        <label htmlFor="email_field" className="form__field-label">
                            {props.isRegister ? 'Register' : 'Login'}
                        </label>
                        <input {...register('login', {required: 'Введён некорректный логин'})}
                               className="form__field-input"/>
                        {errors.login && <div className="auth__error-message wrong__login">{errors.login.message}</div>}
                        <div className="form__field">
                            <label htmlFor="password_field" className="form__field-label">
                                Password
                            </label>
                            <input type="password"
                                   className="form__field-input" {...register('password', {required: 'Введён некорректный пароль'})}/>
                            {errors.password && <div className="auth__error-message wrong__password">{errors.password.message}</div>}
                        </div>
                        <div className="auth__form-buttons">
                            <button className="auth__submit-button">
                                {props.isRegister ? 'Register' : 'Login'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
);
};
