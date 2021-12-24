import React, {useEffect} from 'react';
import { UserItem } from '../UserItem';
import {userProfileStore} from "../../store/UserProfileStore";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";

export const ProfilePage = observer(() => {
    const {login} = useParams()
    // TODO: возможность перехода на профиль юзера
    useEffect(() => {
        userProfileStore.fetchUserProfile(login!).then()
    },[]) //eslint-disable-line

    return (
        <div className="user__profile">
            {
                // TODO: make a loader
            }
            {
                userProfileStore.user &&
                <UserItem user={userProfileStore.user}/>
            }
        </div>
    );
})
