import {fetchWrapper} from "@/utils/fetchWrapper";

export const ComponentTypeFetcher = {
    getAllComponentTypes,
    searchForKey
}

function getAllComponentTypes() {
    return fetchWrapper.get("/componentType")
}

function searchForKey(searchKey) {
    return fetchWrapper.get("/componentType/search?" + new URLSearchParams({ key: searchKey }))
}