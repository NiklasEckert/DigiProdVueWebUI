import {fetchWrapper} from "@/utils/fetchWrapper";

export const ComponentTypeFetcher = {
    getAllComponentTypes,
    getComponentType,
    searchForKey,
    saveComponentType,
    deleteComponentType
}

function getAllComponentTypes() {
    return fetchWrapper.get("componentType")
}

function getComponentType(id) {
    return fetchWrapper.get("componentType/" + id)
}

function searchForKey(searchKey) {
    return fetchWrapper.get("componentType/search?" + new URLSearchParams({ key: searchKey }))
}

function saveComponentType(body) {
    return fetchWrapper.post("componentType", body)
}

function deleteComponentType(id) {
    return fetchWrapper.delete("componentType/" + id)
}