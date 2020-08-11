const fetch = require('node-fetch');
const moment = require('moment');

const base_url = "http://localhost:3001/api"

const users = [
    {
        email: "ringo@star.com",
        password: "1234567890Aa",
        confirmpassword: "1234567890Aa",
        first_name: "Ringo",
        last_name: "Star",
        dob: "1940-07-07"
    },
    {
        email: "paul@mccartney.com",
        password: "1234567890Aa",
        confirmpassword: "1234567890Aa",
        first_name: "Paul",
        last_name: "McCartney",
        dob: "1942-06-18"
    },
    {
        email: "george@harrison.com",
        password: "1234567890Aa",
        confirmpassword: "1234567890Aa",
        first_name: "George",
        last_name: "Harrison",
        dob: "1943-02-25"
    },
    {
        email: "john@lennon.com",
        password: "1234567890Aa",
        confirmpassword: "1234567890Aa",
        first_name: "John",
        last_name: "Lennon",
        dob: "1940-10-09"
    },
    {
        email: "amy@winehouse.com",
        password: "1234567890Aa",
        confirmpassword: "1234567890Aa",
        first_name: "Amy",
        last_name: "Winehouse",
        dob: "1983-09-14"
    },
    {
        email: "kurt@cobain.com",
        password: "1234567890Aa",
        confirmpassword: "1234567890Aa",
        first_name: "Kurt",
        last_name: "Cobain",
        dob: "1967-02-20"
    },
    {
        email: "jimmi@hendrix.com",
        password: "1234567890Aa",
        confirmpassword: "1234567890Aa",
        first_name: "Jimmi",
        last_name: "Hendrix",
        dob: "1942-11-27"
    },
    {
        email: "dizzy@gillespie.com",
        password: "1234567890Aa",
        confirmpassword: "1234567890Aa",
        first_name: "Dizzy",
        last_name: "gillespie",
        dob: "1917-10-21"
    },
    {
        email: "django@reinhardt.com",
        password: "1234567890Aa",
        confirmpassword:"1234567890Aa",
        first_name: "Django",
        last_name: "Reinhardt",
        dob: "1910-01-23"
    },
    {
        email: "charles@mingus.com",
        password: "1234567890Aa",
        confirmpassword:"1234567890Aa",
        first_name: "Charles",
        last_name: "Mingus",
        dob: "1922-04-22"
    },
    {
        email: "ella@fitzgerald.com",
        password: "1234567890Aa",
        confirmpassword:"1234567890Aa",
        first_name: "Ella",
        last_name: "Fitzgerald",
        dob: "1917-04-25"
    },
]


const events = [
    {
        name:"Woodstock Adelaide",
        description: "The greatest outdoor music festival in the greatest city in the world",
        price: Math.floor(50 + Math.random() * 100) * 100,
        sale_date: moment().format(),
        start_date: moment().add(Math.floor(Math.random() * 30), 'd').add(Math.floor(Math.random() * 30), 'M').format(),
        capacity: 20 + Math.floor(Math.random() * 1000),
        venue_name: "Adelaide Oval",
        address: "123 Oval st, Adelaide",
    },
    {
        name:"The Festival of the Loud Noise",
        description: "The loudest noise you'll ever hear",
        price: Math.floor(Math.random() * 100) * 100,
        sale_date: moment().format(),
        start_date: moment().add(Math.floor(Math.random() * 30), 'd').add(Math.floor(Math.random() * 30), 'M').format(),
        capacity: 20 + Math.floor(Math.random() * 1000),
        venue_name: "The Gov",
        address: "11 Port Rd, Hindmarsh",
    },
    {
        name:"Jazz Weekend 2020",
        description: "The largest jazz festival this side of the Torrens. Featuring Miles Davis, Charles Mingus and a special appearance by Django Reinhardt",
        price: Math.floor(Math.random() * 100) * 100,
        sale_date: moment().format(),
        start_date: moment().add(Math.floor(Math.random() * 30), 'd').add(Math.floor(Math.random() * 30), 'M').format(),
        capacity: 20 + Math.floor(Math.random() * 1000),
        venue_name: "The Lounge",
        address: "123 Easy St, Harlem",
    },
    {
        name:"CoranaFest",
        description: "The sickest festival of the year. Featuring all the classics.",
        price: Math.floor(Math.random() * 100) * 100,
        sale_date: moment().format(),
        start_date: moment().add(Math.floor(Math.random() * 30), 'd').add(Math.floor(Math.random() * 30), 'M').format(),
        capacity: 20 + Math.floor(Math.random() * 1000),
        venue_name: "Royal Adelaide Hospital",
        address: "Isolation ward, 123 Hospital st, Melbourne",
    },
    {
        name:"The return of The Beatles",
        description: "Newly resurected from the grave playing every song they've ever written",
        price: Math.floor(Math.random() * 100) * 100,
        sale_date: moment().format(),
        start_date: moment().add(Math.floor(Math.random() * 30), 'd').add(Math.floor(Math.random() * 30), 'M').format(),
        capacity: 20 + Math.floor(Math.random() * 1000),
        venue_name: "The Rooftop",
        address: "66 Rooftop Rd, Adelaide",
    },
]

async function main(){
    let userResults = await Promise.all(users.map(user => {
        return fetch(`${base_url}/users/signup`, {
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(user)
        }).then(response => response.json())
    }))

    // console.log(userResults);
    
    let balanceResults = await Promise.all(userResults.map(user => {
        return fetch(`${base_url}/transactions/balance/add`, {
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${user.token}`
            },
            method: 'POST',
            body: JSON.stringify({amount: 100000})
        }).then(response => response.json())
    }))
    console.log(balanceResults);
    
    let slicenum = Math.floor(userResults.length/3);
    let creatorUsers = userResults.slice(0, slicenum);
    let patronUsers = userResults.slice(slicenum+1, userResults.length -1);
    console.log(creatorUsers);
    console.log(patronUsers);
    
    creatorRes = await Promise.all(creatorUsers.map(user => {
        return fetch(`${base_url}/users/makecreator`, {
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${user.token}`
            },
            method: 'PUT',
        }).then(res => res.json())
    }));
    console.log(creatorRes);
    
    eventResults = await Promise.all(events.map(event => {
        const user = creatorUsers[Math.floor(Math.random() * creatorUsers.length)]
        return fetch(`${base_url}/events/create`,{
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${user.token}`
            },
            method: 'POST',
            body: JSON.stringify(event)
        }).then(res => res.json())
    }))
    // console.log(eventResults);
    
    const ticketRes = await Promise.all(userResults.map(user => {
        return Promise.all([...Array(12)].map((val, i) => {
            let event = eventResults[Math.floor(Math.random() * eventResults.length)];

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    fetch(`${base_url}/tickets/purchase`,{
                        headers: {
                            'content-type': 'application/json',
                            'authorization': `Bearer ${user.token}`
                        },
                        method: 'POST',
                        body: JSON.stringify({event_id: event.id})
                    }).then(res => resolve(res.json()))
                }, 1500*i)
            })

        }))
    }))

    console.log(ticketRes);

    const listRes = await Promise.all(userResults.map(user => {
        return fetch(`${base_url}/tickets/all`, {
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${user.token}`
            }
        }).then(res => res.json()).then(async ({tickets})=> {
            return await Promise.all(tickets.slice(0, 6).map(ticket => {
                return fetch(`${base_url}/tickets/list`,{
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `Bearer ${user.token}`
                    },
                    method: "POST",
                    body: JSON.stringify({id: ticket.id, list_price: Math.floor(Math.random() * 49)*100})
                }).then(res => res.json())
            }))
            
        })
    }));

    // console.log(listRes)

    let listings = await fetch(`${base_url}/market/all`).then(res => res.json()).then(({listings}) => listings);

    for(let i = 0; i < 100; i++){
        const rand = Math.floor(Math.random() * listings.length);
        let temp = listings[rand];
        listings[rand] = listings[0];
        listings[0] = temp;
    }

    const buyRes = await Promise.all(listings.slice(0, Math.floor(listings.length * 0.4)).map((listing, i) => {
        const user = userResults[Math.floor(Math.random() * userResults.length)]
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                fetch(`${base_url}/market/purchase`, {
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `Bearer ${user.token}`
                    },
                    method: "POST",
                    body: JSON.stringify({id: listing.id})
                }).then(res => resolve(res.json()))
            }, 500 * i)
        })
    }))

    console.log(buyRes);

}

main();