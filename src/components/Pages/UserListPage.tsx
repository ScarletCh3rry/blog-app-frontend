import React, {useEffect} from 'react';
import {userListStore} from "../../store/UserListStore";
import {observer} from "mobx-react-lite";
import {UserItem} from "../UserItem";
import {useSearchParams} from "react-router-dom";
import {useDebouncedValue} from "../../hooks/useDebouncedValue";

export const UserListPage = observer( () => {
    // eslint-disable-next-line
    const [query, setQuery] = useSearchParams()
    const search = useDebouncedValue(query.get('search'))

    useEffect(() => {
        userListStore.fetchUsers(search!).then()
    }, [search])
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
