export const fetchWrapper = {
    get,
    post,
    put,
    patch,
    delete: _delete
}

const url = new URL("http://localhost:3000")

function get(path) {
    const requestOptions = {
        method: 'GET'
    }
    return fetch(url + path, requestOptions)
}

function post(path, body) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
    return fetch(url + path, requestOptions)
}

function put(path, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
    return fetch(url + path, requestOptions)
}

function patch(path, body) {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }
    return fetch(url + path, requestOptions)
}

function _delete(path) {
    const requestOptions = {
        method: 'DELETE'
    };
    return fetch(URL + path, requestOptions)
}