const queryApi = (endpoint, options = {}) => {
    return new Promise((resolve, reject) => {
        return fetch(endpoint, {
            ...options
        }).then(result => result.json()).then(json => {
            return resolve(json);
        }).catch(err => {
            return reject(err);
        })
    })
}

export const login = (body) => {
    return queryApi('/api/users/login', {
        body: JSON.stringify(body),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST'
    })
}

export const getBalance = (token) => {

    return queryApi('/api/transactions/balance', {headers: {
        'authorization': `Bearer ${token}`
    }}).then(response => {
        console.log(response);
        return response
    }).catch(error => {
        console.log(error)
    })
}