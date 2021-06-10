import config from 'config';
import { authHeader } from '../_helpers';

export const ladelisteService = {
    
    getAllStatus,
    create,
    createPDF,
    getAll,
    getById,
    getAllVorlagen,
    getPdfById,
    update,
    delete: _delete
};



function create(ladeliste) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(ladeliste)
    };

    return fetch(`${config.apiUrl}/ladeliste`, requestOptions).then(handleResponse);
}

function createPDF(ladeliste) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(ladeliste)
    };

    return fetch(`${config.apiUrl}/ladeliste/pdf`, requestOptions).then(handleResponse);
}



function getAllStatus(status) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/ladeliste/status/${status}`, requestOptions).then(handleResponse);
}

function getAllVorlagen() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/ladeliste/vorlagen`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/ladeliste`, requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/ladeliste/${id}`, requestOptions).then(handleResponse);
}

function getPdfById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/ladeliste/pdf/${id}`, requestOptions).then(handleResponse);
}

function update(ladeliste) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(ladeliste)
    };

    return fetch(`${config.apiUrl}/ladeliste/${ladeliste.id}`, requestOptions).then(handleResponse);
}



// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(data)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}