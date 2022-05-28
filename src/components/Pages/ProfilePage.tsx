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
                            <div className="profile__login">
                                {userProfileStore.user!.login}
                            </div>
                            {
                                authStore.user?.name! !== login!
                                &&
                                <button className="profile-subscribe-btn carousel-btn" onClick={() => {postListStore.setSubscription(login!, authStore.user?.name!, !subscription_status!)}}>
                                    <span>
                                        Подписаться
                                    </span>
                                </button>

                            }
                            {
                                userProfileStore.isOwnProfile &&
                                <EditProfileForm/>
                            }
                        </div>
                        <div className="profile__date-joined">
                            {userProfileStore.user!.date_joined}
                        </div>
                        <div className="profile__email">
                            {userProfileStore.user!.email}
                        </div>
                        <div className="profile__last-login">
                            {userProfileStore.user!.last_login}
                        </div >

                        <div className="profile__posts-count">
                            {userProfileStore.user!.posts_count}
                        </div>
                        <NavLink className="user-profile__blog-list" to={`/blogs/${userProfileStore.user!.login}`}>
                            Блоги пользователя
                        </NavLink>
                    </div>
                </>
            }
        </div>
    );
})
