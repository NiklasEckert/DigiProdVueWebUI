import {fetchWrapper} from "@/utils/fetchWrapper";

export const ComponentFetcher = {
    getAllComponents,
    getComponent,
    searchForKey,
    saveComponent,
    getEventsForComponent
}

function getAllComponents() {
    return fetchWrapper.get("component")
}

function getComponent(id) {
    return fetchWrapper.get("component/" + id)
}

function saveComponent(component) {
    return fetchWrapper.post("component", component)
}

function searchForKey(searchKey) {
    return fetchWrapper.get("component/search?" + new URLSearchParams({ key: searchKey }))
}

function getEventsForComponent(id) {
    return fetchWrapper.get("component/" + id + "/events")
}