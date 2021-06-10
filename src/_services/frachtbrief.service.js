import config from 'config';
import { authHeader } from '../_helpers';

export const frachtbriefService = {
    
    create,
    createPDF,
    getAllStatus,
    createFinalPDF,
    getAll,
    getAllVorlagen,
    getById,
    getPdfById,
    update,
    delete: _delete
};



function create(frachtbrief) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(frachtbrief)
    };

    return fetch(`${config.apiUrl}/frachtbrief`, requestOptions).then(handleResponse);
}

function getAllStatus(status) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/frachtbrief/status/${status}`, requestOptions).then(handleResponse);
}

function createPDF(frachtbrief) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(frachtbrief)
    };

    return fetch(`${config.apiUrl}/frachtbrief/pdf`, requestOptions).then(handleResponse);
}

function createFinalPDF(frachtbrief) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(frachtbrief)
    };

    return fetch(`${config.apiUrl}/frachtbrief/pdffinal`, requestOptions).then(handleResponse);
}



function getAllVorlagen() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/frachtbrief/vorlagen`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/frachtbrief`, requestOptions).then(handleResponse);
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/frachtbrief/${id}`, requestOptions).then(handleResponse);
}

function getPdfById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/frachtbrief/pdf/${id}`, requestOptions).then(handleResponse);
}

function update(frachtbrief) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(frachtbrief)
    };

    return fetch(`${config.apiUrl}/frachtbrief/${frachtbrief.id}`, requestOptions).then(handleResponse);
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