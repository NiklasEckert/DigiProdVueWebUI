import {fetchWrapper} from "@/utils/fetchWrapper";

export const EmployeeFetcher = {
    getAllEmployees,
    getEmployee,
    searchForKey,
    saveEmployee,
    deleteEmployee,
    updateEmployee
}

function getAllEmployees() {
    return fetchWrapper.get("employee")
}

function getEmployee(id) {
    return fetchWrapper.get("employee/" + id)
}

function searchForKey(searchKey, page = 0, size = 50, active ="true") {
    return fetchWrapper.get("employee/search?" + new URLSearchParams({ key: searchKey, page: ''+page, size: ''+size, active: active}))
}

function saveEmployee(body) {
    return fetchWrapper.post("employee", body)
}

function deleteEmployee(id) {
    return fetchWrapper.delete("employee/" + id)
}

function updateEmployee(id, body) {
    return fetchWrapper.patch("employee/" + id, body)
}