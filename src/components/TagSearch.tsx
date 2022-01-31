import React, {useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import {tagListStore} from "../store/TagListStore";
import { observer } from 'mobx-react-lite';
import {toObj} from "../utils/toObj";


export const TagSearch = observer(() => {

    useEffect(() => {
        tagListStore.fetchTags().then()
    }, [])

    const [query, setQuery] = useSearchParams()
    const queryTags = query.getAll('tags')

    const addTag = (tag: string) => {
        setQuery({ ...toObj(query), tags: [...queryTags, tag] })
    }
    const removeTag = (tag: string) => {
        setQuery({ ...toObj(query), tags: queryTags.filter(t => t !== tag) })
    }


    return (
        <div className="tag__search">
            <div className="tag__search-input">
                <div className="tag__search-label">
                    Введите название Тега:
                </div>
                {/*<MyInput/>*/}
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
