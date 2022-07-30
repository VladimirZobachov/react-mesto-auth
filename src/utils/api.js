import options from "./utils";

class Api{
    constructor(options) {
        this._options = options;
    }

    _check = (res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUser(){
        return fetch(`${this._options.baseUrl}/users/me`, {
            headers: this._options.headers
        })
        .then(this._check);
    }

    setUser(name, major){
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                name: name,
                about: major,
            })
        })
        .then(this._check);
    }

    setAvatar(avatar){
        return fetch(`${this._options.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                avatar: avatar,
            })
        })
        .then(this._check);
    }

    getInitialCards() {
        return fetch(`${this._options.baseUrl}/cards`, {
            headers: this._options.headers
        })
        .then(this._check);
    }

    addCard(name, link) {
        return fetch(`${this._options.baseUrl}/cards`, {
            method: 'POST',
            headers: this._options.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(this._check);
    }

    addLike(id){
        return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._options.headers
        })
        .then(this._check);
    }

    delLike(id){
        return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._options.headers
        })
        .then(this._check);
    }

    changeLikeCardStatus(id, isLiked){
        if(isLiked){
            return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
                method: 'PUT',
                headers: this._options.headers
            })
            .then(this._check);
        }else{
            return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
                method: 'DELETE',
                headers: this._options.headers
            })
            .then(this._check);
        }
    }

    delCard(id) {
        return fetch(`${this._options.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._options.headers
        })
        .then(this._check);
    }
}

const api = new Api(options)

export default api;