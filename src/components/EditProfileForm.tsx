import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {observer} from "mobx-react-lite";
import {userProfileStore} from "../store/UserProfileStore";
import {useNavigate} from "react-router-dom";

type EditProfileFields = {
    login: { value: string, isChangeable: boolean },
    email: { value: string, isChangeable: boolean }
};

export const EditProfileForm = observer(() => {


    const {register, handleSubmit, watch, formState: {errors}, setValue, getValues} = useForm<EditProfileFields>({ //eslint-disable-line
        defaultValues: {
            login: {value: "", isChangeable: false},
            email: {value: "", isChangeable: false}
        }
    });
    useEffect(() => {
        setValue("login.value", userProfileStore.user?.login || "")
        setValue("email.value", userProfileStore.user?.email || "")
    }, [userProfileStore.user?.login, userProfileStore.user?.email])//eslint-disable-line


    const [login, email] = watch(["login", "email"])

    const navigate = useNavigate()
    const onSubmit = (data: EditProfileFields) => {

        userProfileStore.editUserProfile(userProfileStore.user!.login, {
            login: data.login.value,
            email: data.email.value
        }).then(() => {
            navigate(`/profile/${data.login.value}`)
            setValue('login.isChangeable', false)
            setValue('email.isChangeable', false)
        })
    };

    const cancelChanges = () => {
        setValue('login.value', userProfileStore.user!.login)
        setValue('email.value', userProfileStore.user!.email)
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
            {
                (login.isChangeable || email.isChangeable) &&
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