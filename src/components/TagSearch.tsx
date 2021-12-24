import React, {useEffect} from 'react';
import {MyInput} from "./UI/myInput/MyInput";
import {useSearchParams} from "react-router-dom";
import {tagListStore} from "../store/TagListStore";
import { observer } from 'mobx-react-lite';


export const TagSearch = observer(() => {

    useEffect(() => {
        tagListStore.fetchTags().then()
    }, [])

    const [query, setQuery] = useSearchParams()
    const queryTags = query.getAll('tags')

    const addTag = (tag: string) => {
        setQuery({ tags: [...queryTags, tag] })
    }
    const removeTag = (tag: string) => {
        setQuery({ tags: queryTags.filter(t => t !== tag) })
    }


    return (
        <div className="tag__search">
            <div className="tag__search-input">
                <div>
                    Введите название Тега:
                </div>
                <MyInput/>
            </div>
            <div className="tag__search-list">
                {
                    tagListStore.tags.map(
                        (tag) => {
                            const isActive = queryTags.includes(tag.slug)
                            return(
                                <button
                                    className={isActive ? 'active tag__search-button' : 'tag__search-button'}
                                    onClick={() => isActive ? removeTag(tag.slug) : addTag(tag.slug)}
                                    key={tag.slug}
                                >
                                    {tag.name}
                                </button>
                            )
                        }
                    )
                }
            </div>
        </div>
    );
});
