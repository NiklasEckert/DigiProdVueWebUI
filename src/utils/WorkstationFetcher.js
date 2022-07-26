import {fetchWrapper} from "@/utils/fetchWrapper";

export const WorkstationFetcher = {
    getWorkstation,
    searchForKey,
    saveWorkstation,
    deleteWorkstation
}

function getWorkstation(id) {
    return fetchWrapper.get("workstation/" + id)
}

function searchForKey(searchKey, page = 0, size = 50) {
    return fetchWrapper.get("workstation/search?" + new URLSearchParams({ key: searchKey, page: ''+page, size: ''+size }))
}

function saveWorkstation(body) {
    return fetchWrapper.post("workstation", body)
}

function deleteWorkstation(id) {
    return fetchWrapper.delete("workstation/" + id)
}