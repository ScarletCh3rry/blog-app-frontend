import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {observer} from "mobx-react-lite";
import {userProfileStore} from "../store/UserProfileStore";
import {useNavigate} from "react-router-dom";

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
        formData.append("avatar", data.avatar.value ? data.avatar.value[0] : "")
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
    }
    return (
        <form className="editProfileForm" onSubmit={handleSubmit(onSubmit)}>
            <div>
                {
                    login.isChangeable
                        ?
                        <input {...register("login.value", {required: "You need to type your new login"})} />
                        :
                        <span>
                                {login.value}
                        </span>
                }
                <button type="button" onClick={() => {
                    setValue('login.isChangeable', !getValues('login.isChangeable'))
                    if (!getValues('login.isChangeable')) {
                        setValue('login.value', userProfileStore.user!.login)
                    }
                }
                }>Karandash
                </button>
            </div>
            <div>
                {
                    email.isChangeable
                        ?
                        <input {...register("email.value", {required: "You need to type your new email"})} />
                        :
                        <span>
                                {email.value}
                        </span>
                }
                <button type="button" onClick={() => {
                    setValue('email.isChangeable', !getValues('email.isChangeable'))
                    if (!getValues('email.isChangeable')) {
                        setValue('email.value', userProfileStore.user!.email)
                    }
                }
                }>Karandash
                </button>
            </div>
            <div>
                {
                    avatar.isChangeable
                        ?
                        <input type="file" {...register("avatar.value", {required: "You need to set your new avatar"})} />
                        :
                        <span>
                                {avatar.value}
                        </span>
                }
                <button type="button" onClick={() => {
                    setValue('avatar.isChangeable', !getValues('avatar.isChangeable'))
                    if (!getValues('avatar.isChangeable')) {
                        setValue('avatar.value', userProfileStore.user!.avatar)
                    }
                }
                }>Karandash
                </button>
            </div>
            {
                (login.isChangeable || email.isChangeable || avatar.isChangeable) &&
                <div>
                    <button type="submit" className="edit-profile-btn edit-profile-submit">
                        Save changes
                    </button>
                    <button onClick={() => cancelChanges()} className="edit-profile-btn edit-profile-cancel">
                        Cancel changes
                    </button>
                </div>
            }

        </form>
    );
})