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
        
        return response
    }).catch(error => {
        console.log(error)
        throw error;
    })
}
export const getTransactions = (token) => {

    return queryApi('/api/transactions/all', {headers: {
        'authorization': `Bearer ${token}`
    }}).then(response => {
        
        return response
    }).catch(error => {
        console.log(error)
        throw error;
    })
}

export const getTickets = (token) => {

    return queryApi('/api/tickets/all', {headers: {
        'authorization': `Bearer ${token}`
    }}).then(response => {
        
        return response
    }).catch(error => {
        console.log(error)
        throw error;
    })
}

export const getUserInfo = (token) => {

    return queryApi('/api/users/', {headers: {
        'authorization': `Bearer ${token}`
    }}).then(response => {
        
        return response
    }).catch(error => {
        console.log(error)
        throw error;
    })
}

export const addFunds = (token, amount) => {

    return queryApi('/api/transactions/balance/add', 
    {
        headers: {
            'authorization': `Bearer ${token}`,
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({amount: amount})
    }).then(response => {
        
        return response
    }).catch(error => {
        console.log(error)
        throw error;
    })
}

export const getEvents = () => {
    return queryApi('/api/events/all', 
    {
    }).then(response => {
        
        return response
    }).catch(error => {
        console.log(error)
        throw error;
    })
}

export const purchaseTicket = (token, eventId) => {
    return queryApi('/api/tickets/purchase', 
    {
        headers: {
            'authorization': `Bearer ${token}`,
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({event_id: eventId})
    }).then(response => {
        
        return response
    }).catch(error => {
        console.log(error)
        throw error;
    })
}

export const signup = (body) => {
    return queryApi('/api/users/signup', 
    {
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    }).then(response => {
        
        return response
    }).catch(error => {
        console.log(error)
        throw error;
    })
}

export const getListings = () => {
    return queryApi('/api/market/all', 
    {
    }).then(response => {
        return response
    }).catch(error => {
        console.log(error)
        throw error;
    })
}

export const purchaseMarketTicket = (token, listingId) => {
    return queryApi('/api/market/purchase', {
        headers: {
            'authorization': `Bearer ${token}`,
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({id: listingId})
    }).then(response => {
        return response
    }).catch(error => {
        console.log(error)
        throw error;
    })
}

export const getEventInfo = (eventId) => {
    return queryApi(`/api/events/${eventId}`).then(response => {
        return response
    }).catch(error => {
        console.log(error)
        throw(error);
    })
}

export const listTicketOnMarket = (token, body) => {
    return queryApi('/api/tickets/list', {
        headers: {
            'authorization': `Bearer ${token}`,
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    }).then(response => {
        return response
    }).catch(error => {
        console.log(error)
        throw error
    })
}

export const removeTicketFromMarket = (token, ticketId) => {
    return queryApi(`/api/market/remove?id=${ticketId}`, {
        headers: {
            'authorization': `Bearer ${token}`,
            'content-type': 'application/json'
        },
        method: 'DELETE'
    }).then(response => {
        return response
    }).catch(error => {
        console.log(error)
        throw error
    })
}