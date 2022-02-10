//MADE BY:- Ayush Gupta - 1910990212 - st2
const API = process.env.REACT_APP_BACKEND

export const getAllContacts = () => {
    return fetch(`${API}/api/contacts`, {
        method: "GET"
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log("error occured"))
}

export const createContact = (contact) => {
    return fetch(`${API}/api/createcontact/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: contact
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const updateContact = (contactId, contact) => {
    return fetch(`${API}/api/updatecontact/${contactId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json"
        },
        body: contact
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const deleteContact = (contactId) => {
    return fetch(`${API}/api/contact/${contactId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const getContact = (contactId) => {
    return fetch(`${API}/api/contact/${contactId}`, {
        method: "GET",
    })
    .then(response => {
        return response.json() })
    .catch(err => console.log(err))
}