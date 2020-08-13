const fetch = require('node-fetch');
const moment = require('moment');
const fs = require('fs');
const { resolve } = require('path');

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

const demoUsers = [
    {
        email: "elvis@presly.com",
        password: "1234567890Aa",
        confirmpassword: "1234567890Aa",
        first_name: "Elvis",
        last_name: "Presley",
        dob: "1935-01-08"
    },
    {
        email: "johnny@cash.com",
        password: "1234567890Aa",
        confirmpassword: "1234567890Aa",
        first_name: "Johnny",
        last_name: "Cash",
        dob: "1940-07-07"
    },
    {
        email: "david@bowie.com",
        password: "1234567890Aa",
        confirmpassword: "1234567890Aa",
        first_name: "David",
        last_name: "Bowie",
        dob: "1940-07-07"
    },
    {
        email: "bob@dylan.com",
        password: "1234567890Aa",
        confirmpassword: "1234567890Aa",
        first_name: "Bob",
        last_name: "Dylan",
        dob: "1940-07-07"
    },
    {
        email: "freddie@mercury.com",
        password: "1234567890Aa",
        confirmpassword: "1234567890Aa",
        first_name: "Freddie",
        last_name: "Mercury",
        dob: "1940-07-07"
    },
    {
        email: "ludwig@beethoven.com",
        password: "1234567890Aa",
        confirmpassword: "1234567890Aa",
        first_name: "Ludwig",
        last_name: "Beethoven",
        dob: "1940-07-07"
    },
    {
        email: "ozzy@osbourne.com",
        password: "1234567890Aa",
        confirmpassword: "1234567890Aa",
        first_name: "Ozzy",
        last_name: "Osbourne",
        dob: "1940-07-07"
    },
    {
        email: "stevie@wonder.com",
        password: "1234567890Aa",
        confirmpassword: "1234567890Aa",
        first_name: "Stevie",
        last_name: "Wonder",
        dob: "1940-07-07"
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
        image_url: "https://i.imgur.com/UBuLLOh.jpg"
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
        image_url: "https://i.imgur.com/7GN5H0d.jpg"
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
        image_url: "https://i.imgur.com/m2wbkqI.jpg"
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
        image_url: "https://i.imgur.com/MEbaQ60.jpg"
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
        image_url: "https://i.imgur.com/gpKBO7e.jpg"
    },
]

const writeFile = (header, message) => {
    
    const data = `\n ${header} \n \n ${JSON.stringify(message,null,4)}`
    
    fs.appendFile('./output.txt', data, (err) => {
        if(err) return reject(err);

        return resolve();
    })
}
const initFile = () => {
    return new Promise ((resolve, reject) => {
        fs.writeFile('./output.txt',"",(err) => {
            return resolve();
        })

    })
}

async function main(){
    initFile()

    let userResults = await Promise.all(users.map(user => {
        return fetch(`${base_url}/users/signup`, {
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(user)
        }).then(response => response.json())
    }))

    let demoUserResults = await Promise.all(demoUsers.map(user => {
        return fetch(`${base_url}/users/signup`, {
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(user)
        }).then(response => response.json())
    }))

    console.log("Users created");
    await writeFile("User Results", userResults)
    await writeFile("Demo User Results", demoUserResults)
    
    
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

    console.log("User balances added");
    await writeFile("Balance Transaction results", balanceResults)
    
    let slicenum = Math.floor(userResults.length/3);
    let creatorUsers = userResults.slice(0, slicenum);
    let patronUsers = userResults.slice(slicenum+1, userResults.length -1);
    await writeFile("Creator Users", creatorUsers)
    await writeFile("Patron Users", patronUsers)
    

    
    creatorRes = await Promise.all(creatorUsers.map(user => {
        return fetch(`${base_url}/users/makecreator`, {
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${user.token}`
            },
            method: 'PUT',
        }).then(res => res.json())
    }));

    console.log("Users made creators");
    await writeFile("Event Creator results", creatorRes)
    
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
    console.log("Events created");
    await writeFile("Created event results", eventResults)
    
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

    console.log("Tickets purchased");
    await writeFile("Ticket Purchasing results", ticketRes)

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
                    body: JSON.stringify({id: ticket.id, list_price: Math.ceil(Math.random() * 49)*100})
                }).then(res => res.json())
            }))
            
        })
    }));

    console.log("Tickets listed")
    await writeFile("Ticket listing results", listRes)

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

    console.log("Market Tickets bought");
    await writeFile("Market Ticket buying results", buyRes)

}

main();