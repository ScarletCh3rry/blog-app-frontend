import React from 'react';
import {authStore} from "../../store/AuthStore";
import {useForm} from "react-hook-form";


export type RegisterForm = {
    login: string
    password: string
    email: string
}

export const RegisterPage = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<RegisterForm>()

    const onSubmit = (data: RegisterForm) => {
        return authStore.register(data)
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
                            Login for registration
                        </label>
                        <input {...register('login', {required: 'Введён некорректный логин'})}
                               className="form__field-input"/>
                        {errors.login && <div className="auth__error-message wrong__login">{errors.login.message}</div>}
                    </div>
                    <div className="form__field">
                        <label htmlFor="email_field" className="form__field-label">
                            Email
                        </label>
                        <input type="text"
                               className="form__field-input" {...register('email', {required: 'Введён некорректный email'})}/>
                        {errors.email &&
                        <div className="auth__error-message wrong__email">{errors.email.message}</div>}
                    </div>
                    <div className="form__field">
                        <label htmlFor="password_field" className="form__field-label">
                            Password
                        </label>
                        <input type="password"
                               className="form__field-input" {...register('password', {required: 'Введён некорректный пароль'})}/>
                        {errors.password &&
                        <div className="auth__error-message wrong__password">{errors.password.message}</div>}
                    </div>
                    <div className="auth__form-buttons">
                        <button className="auth__submit-button">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};