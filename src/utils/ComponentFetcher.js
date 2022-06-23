import {fetchWrapper} from "@/utils/fetchWrapper";

export const ComponentFetcher = {
    getAllComponents,
    getComponent,
    searchForKey
}

function getAllComponents() {
    return fetchWrapper.get("component")
}

function getComponent(id) {
    return fetchWrapper.get("component/" + id)
}

function searchForKey(searchKey) {
    return fetchWrapper.get("component/search?" + new URLSearchParams({ key: searchKey }))
}