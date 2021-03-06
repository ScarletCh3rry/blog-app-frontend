import React from 'react';
import {authStore} from "../../store/AuthStore";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

export type LoginForm = {
    login: string
    password: string
}

export const LoginPage = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginForm>()

    const navigate = useNavigate()

    const onSubmit = (data: LoginForm) => {
        return authStore.login(data)
            .then(() => navigate("/"))
    }

    return (
        <div className="auth__layout">
            <div className="auth__form-container">
                <div className="auth__form-title">
                    Войдите в аккаунт
                </div>
                <form action="" className="auth__form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form__field">
                        <label htmlFor="email_field" className="form__field-label">
                            Логин
                        </label>
                        <input {...register('login', {required: 'Введён некорректный логин'})}
                               className="form__field-input edit-form__field"/>
                        {errors.login && <div className="auth__error-message wrong__login">{errors.login.message}</div>}
                    </div>
                    <div className="form__field">
                        <label htmlFor="password_field" className="form__field-label">
                            Пароль
                        </label>
                        <input type="password"
                               className="form__field-input edit-form__field" {...register('password', {required: 'Введён некорректный пароль'})}/>
                        {errors.password &&
                        <div className="auth__error-message wrong__password">{errors.password.message}</div>}
                    </div>
                    <button className="auth__submit-button">
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
};

