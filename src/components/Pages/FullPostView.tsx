import React, {useEffect} from 'react';
import {fullPostStore} from "../../store/FullPostStore";
import {useNavigate, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";

export const FullPostView = observer(() => {
    const {login, blogSlug, postSlug} = useParams()
    useEffect(() => {
        fullPostStore.fetchFullPost(login!, blogSlug!, postSlug!).then()// eslint-disable-next-line
    }, [])

    const navigate = useNavigate()
    const deletePost = () => {
        fullPostStore.deletePost(login!, blogSlug!, postSlug!)
            .then(() => navigate('/'))
    }
    return (
        <div className="fullpost-container">
            <div>
                {fullPostStore.post?.description}
            </div>
            <button onClick={deletePost}>
                DELETE
            </button>
        </div>
    );
})