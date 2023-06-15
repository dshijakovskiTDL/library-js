// * Import the needed packages
// *    - need to make the project "type": "module" in `package.json`
import express, { json } from 'express'
import { getBooks } from './utils.js'

// ? Create a server instance - invoke the express method
const server = express()
const PORT = 3000 // Port number for the server to listen to

// ? Start listening to requests at port number PORT
server.listen(PORT, () => {
    console.log(`Library started at http://localhost:${PORT}`)
})

// ? We can the assign endpoint for the server to listen to requests to

// ? GET listener at: / (a.k.a root/home)
server.get('/', (request, response) => {
    response.json({ message: 'Hello! Welcome to the TDL Library! 📚' })
})

// ? Listen to a request for a books query - Search & Filter
// ? GET listener at: /search
server.get('/search', (request, response) => {
    // ? We need to get the query param out of the request
    const { query } = request

    // ? We will assume that only 1 query param will be passed
    // ? Meaning we will only search & filter by 1 category
    const keys = Object.keys(query)

    getBooks()

    // ? If no query is passed in, return the entire list of books
    if (keys.length === 0) {

    } else {
        // ? Otherwise, return the filtered list, filtered by the category provided from the query
        const [key, ] = keys


    }

    response.json(keys)
})
