import React, {RefObject} from 'react';
import {PostItem} from "./PostItem";
import {observer} from "mobx-react-lite";
import {Loader} from "./UI/Loader/Loader";
import { Post } from '../types/PostItem';

type Props = {
    observerElement: RefObject<HTMLDivElement>
    isSubloading: boolean
    isFirstLoading: boolean
    postList: Post[]
}

export const PostList = observer((props: Props) => {


    return (
        <div className="post__list">
            {
                props.isFirstLoading
                    ?
                    <Loader/>
                    :
                    <>
                        {props.postList.map(post => <PostItem key={post.id} post={post}/>)}
                        <div ref={props.observerElement} style={{height: 1, width: 10}}/>
                        {
                            props.isSubloading &&
                                <Loader/>
                        }
                    </>

            }

        </div>
    );
})