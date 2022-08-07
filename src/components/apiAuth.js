export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        }),
})
        .then((response)=>{
            return response.json();
        })
        .then((res)=>{
            return res;
        })
        .catch((err)=>{
            console.log(err);
        })
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        }),
    })
        .then((response)=>{
            return response.json();
        })
        .then((res)=>{
            return res;
        })
        .catch((err)=>{
            console.log(err);
        })
}

export const getContent = (jwt)=>{
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content/type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    })
        .then((response)=>{
            return response.json();
        })
        .then((res)=>{
            return res;
        })
        .catch((err)=>{
            console.log(err);
        })
}