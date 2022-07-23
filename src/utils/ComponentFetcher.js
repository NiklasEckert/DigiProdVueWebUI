import {fetchWrapper} from "@/utils/fetchWrapper";

export const ComponentFetcher = {
    getAllComponents,
    getComponent,
    searchForKey,
    saveComponent,
    getEventsForComponent,
    markAsKilled,
    deleteComponent,
    disconnectFromParent,
    updateComponent,
    fetchComponentTree
}

function disconnectFromParent(id) {
    return fetchWrapper.patch( "component/" + id + "/removeParent")
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

function searchForKey(searchKey, page, size) {
    return fetchWrapper.get("component/search?" + new URLSearchParams({ param: searchKey, page: page, size: size }))
}

function getEventsForComponent(id) {
    return fetchWrapper.get("component/" + id + "/events")
}

function markAsKilled(id) {
    return fetchWrapper.patch("component/" + id + "/status", {statusName: "Killed"})
}

function deleteComponent(id) {
    return fetchWrapper.delete("component/" + id)
}

function updateComponent(id, updates) {
    return fetchWrapper.patch("component/" + id, updates);
}
function fetchComponentTree(id){
    return fetchWrapper.get("component/"+id+"/tree");
}