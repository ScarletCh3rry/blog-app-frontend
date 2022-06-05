import React, {useEffect} from 'react';
import {userProfileStore} from "../../store/UserProfileStore";
import {observer} from "mobx-react-lite";
import {NavLink, useParams} from "react-router-dom";
import { EditProfileForm } from '../EditProfileForm';
import {Loader} from "../UI/Loader/Loader";
import {postListStore} from "../../store/PostListStore";
import {authStore} from "../../store/AuthStore";

export const ProfilePage = observer(() => {

    const {login} = useParams()
    useEffect(() => {
        userProfileStore.fetchUserProfile(login!).then()
    },[]) //eslint-disable-line

    const subscription_status = userProfileStore.user?.subscription_status

    return (
        <div className="user-profile-page">
            {
                userProfileStore.isLoading
                    ?
                    <Loader/>
                    :
                <>
                    <div className="user-profile">
                        <div className="user-changes__container">
                            <img className="user-profile-avatar" src={userProfileStore.user!.avatar as any} alt=""/>
                            <div className="profile-page__login">
                                Имя профиля: {userProfileStore.user!.login}
                            </div>
                            {
                                authStore.user?.name! !== login! && authStore.isAuth
                                &&
                                <button className="edit-profile-btn" id="profile-subscribe-btn" onClick={() => {postListStore.setSubscription(login!, authStore.user?.name!, !subscription_status!)}}>
                                        Подписаться
                                </button>

                            }
                            {
                                userProfileStore.isOwnProfile &&
                                <EditProfileForm/>
                            }
                            <NavLink className="user-profile__blog-list" to={`/blogs/${userProfileStore.user!.login}`}>
                                Блоги пользователя
                            </NavLink>
                        </div>
                        <div className="user-profile-info">
                            <div className="profile__date-joined user-profile-info-element">
                                Пользователь был зарегистрирован: {userProfileStore.user!.date_joined}
                            </div>
                            <div className="profile__last-login user-profile-info-element">
                                Последний вход пользователя: {userProfileStore.user!.last_login}
                            </div >
                            <div className="profile__posts-count user-profile-info-element">
                                Постов было опубликовано: {userProfileStore.user!.posts_count}
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
})
