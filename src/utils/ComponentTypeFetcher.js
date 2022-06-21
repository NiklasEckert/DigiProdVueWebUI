import {fetchWrapper} from "@/utils/fetchWrapper";

export const ComponentTypeFetcher = {
    getAllComponentTypes,
    getComponentType,
    searchForKey,
    saveComponentType
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