import {fetchWrapper} from "@/utils/fetchWrapper";

export const ComponentFetcher = {
    getAllComponents,
    getComponent,
    searchForKey,
    saveComponent,
    getEventsForComponent,
    markAsKilled
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
    return fetchWrapper.get("component/search?" + new URLSearchParams({ param: searchKey }))
}

function getEventsForComponent(id) {
    return fetchWrapper.get("component/" + id + "/events")
}

function markAsKilled(id) {
    return fetchWrapper.patch("component/" + id + "/status", {statusName: "Killed"})
}