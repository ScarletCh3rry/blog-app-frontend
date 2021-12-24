import React from 'react';
import {observer} from "mobx-react-lite";
import {User} from "../types/User";

type Props = {
    user: User
}

export const UserItem = observer(({user}: Props) => {
    return (
        <div>
            <div>
                {user.login}
            </div>
            {/*<div>*/}
            {/*    <img src={user.avatar} alt=""/>*/}
            {/*</div>*/}
            <div>
                {user.date_joined}
            </div>
            <div>
                {user.email}
            </div>
            <div>
                {user.last_login}
            </div>
            <div>
                {user.posts_count}
            </div>
        </div>
    );
})
