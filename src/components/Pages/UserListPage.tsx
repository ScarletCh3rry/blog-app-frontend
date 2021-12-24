import React, {useEffect} from 'react';
import {userListStore} from "../../store/UserListStore";
import {observer} from "mobx-react-lite";
import {UserItem} from "../UserItem";

export const UserListPage = observer( () => {
    useEffect(() => {
        userListStore.fetchUsers().then()
    }, [])
    return (
        <div className="user__list-page">
            {
                userListStore.users.map(
                    (user) => <UserItem user={user} key={user.id}/>
                )
            }
        </div>
    );
})
