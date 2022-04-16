import {Tag} from "../types/PostItem";
import {action, makeAutoObservable} from "mobx";
import {tagsAPI} from "../API/tagsAPI";


class TagList{

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    tags: Tag[] = []
    isLoading = false
    error: string | null = null

    fetchTags(search: string = '') {
        this.isLoading = true
        return tagsAPI.getAllTags(search)
            .then(
                action(
                    'setTags',
                    (paginatedTags) => this.tags = paginatedTags.results
                )
            )
            .catch(
                action(
                    'failedTagFetching',
                    (error) => {
                        console.dir(error)
                    }
                )
            )
            .finally(
                action(
                    'fetchTagsEnd',
                    () => this.isLoading = false
                )
            )
    }
}

export const tagListStore = new TagList();