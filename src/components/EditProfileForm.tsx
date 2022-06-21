import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {observer} from "mobx-react-lite";
import {userProfileStore} from "../store/UserProfileStore";
import {useNavigate} from "react-router-dom";
import { BsFillPencilFill } from 'react-icons/all';

type EditProfileFields = {
    login: { value: string, isChangeable: boolean },
    email: { value: string, isChangeable: boolean },
    avatar: { value: FileList | null, isChangeable: boolean}
};

export const EditProfileForm = observer(() => {


    const {register, handleSubmit, watch, formState: {errors}, setValue, getValues} = useForm<EditProfileFields>({ //eslint-disable-line
        defaultValues: {
            login: {value: "", isChangeable: false},
            email: {value: "", isChangeable: false},
            avatar: {value: null, isChangeable: false}
        }
    });
    useEffect(() => {
        setValue("login.value", userProfileStore.user?.login || "")
        setValue("email.value", userProfileStore.user?.email || "")
        setValue("avatar.value", userProfileStore.user?.avatar || null)
    }, [userProfileStore.user?.login, userProfileStore.user?.email, userProfileStore.user?.avatar])//eslint-disable-line


    const [login, email, avatar] = watch(["login", "email", "avatar"])

    const navigate = useNavigate()
    const onSubmit = (data: EditProfileFields) => {
        const formData = new FormData();
        formData.append("login", data.login.value)
        formData.append("email", data.email.value)
        if (typeof data.avatar.value !== "string")
        {
            formData.append("avatar", data.avatar.value ? data.avatar.value[0] : "")
        }
        userProfileStore.editUserProfile(userProfileStore.user!.login, formData).then(() => {
            navigate(`/profile/${data.login.value}`)
            setValue('login.isChangeable', false)
            setValue('email.isChangeable', false)
            setValue('avatar.isChangeable', false)
        })
    };

    const cancelChanges = () => {
        setValue('login.value', userProfileStore.user!.login)
        setValue('email.value', userProfileStore.user!.email)
        setValue('avatar.value', userProfileStore.user!.avatar)
        login.isChangeable = false
        email.isChangeable = false
        avatar.isChangeable = false
    }
    return (
        <form className="editProfileForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="edit-form__element">
                {
                    login.isChangeable
                        ?
                        <input className="edit-form__field" {...register("login.value", {required: "You need to type your new login"})} />
                        :
                        <span className="profile-info">
                                {login.value}
                        </span>
                }
                <button type="button" className="profile-change-btn" onClick={() => {
                    setValue('login.isChangeable', !getValues('login.isChangeable'))
                    if (!getValues('login.isChangeable')) {
                        setValue('login.value', userProfileStore.user!.login)
                    }
                }
                }>
                    <BsFillPencilFill className="pencil-icon"/>
                </button>
            </div>
            <div className="edit-form__element">
                {
                    email.isChangeable
                        ?
                        <input className="edit-form__field" {...register("email.value", {required: "You need to type your new email"})} />
                        :
                        <span className="profile-info">
                                {email.value}
                        </span>
                }
                <button type="button" className="profile-change-btn" onClick={() => {
                    setValue('email.isChangeable', !getValues('email.isChangeable'))
                    if (!getValues('email.isChangeable')) {
                        setValue('email.value', userProfileStore.user!.email)
                    }
                }
                }>
                    <BsFillPencilFill className="pencil-icon"/>
                </button>
            </div>
            <div className="edit-form__element">
                {
                    avatar.isChangeable
                        ?
                        <>
                            <label className="custom-file-upload" htmlFor="file-upload"><span id="fileUploadLabel">Выберите файл</span></label>
                            <input  id="file-upload" className="file-upload" type="file" accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*" {...register("avatar.value", {required: "You need to set your new avatar"})} />
                        </>
                        :
                        <span className="profile-info" id="profile-info-avatar__path">
                                Выбран файл: {avatar.value}
                        </span>
                }
                <button type="button" className="profile-change-btn" onClick={() => {
                    setValue('avatar.isChangeable', !getValues('avatar.isChangeable'))
                    if (!getValues('avatar.isChangeable')) {
                        setValue('avatar.value', userProfileStore.user!.avatar)
                    }
                }
                }>
                    <BsFillPencilFill className="pencil-icon"/>
                </button>
            </div>
            {
                (login.isChangeable || email.isChangeable || avatar.isChangeable) &&
                <div className="edit-profile-btn__container">
                    <button type="submit" className="edit-profile-btn" id="edit-profile-submit">
                        Сохранить изменения
                    </button>
                    <button type="button" onClick={() => cancelChanges()} className="edit-profile-btn" id="edit-profile-cancel">
                        Отменить изменения
                    </button>
                </div>
            }

        </form>
    );
})