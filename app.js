// * Import the needed packages
// *    - need to make the project "type": "module" in `package.json`
import express from 'express'

// ? Create a server instance - invoke the express method
const server = express()
const PORT = 3000 // Port number for the server to listen to

// ? Start listening to requests at port number PORT
server.listen(PORT, () => {
    console.log(`Library started at http://localhost:${PORT}`)
})

// ? We can the assign endpoint for the server to listen to requests to
server.get('/', (request, response) => {
    response.json({ message: 'Welcome to the TDL Library! 📚' })
})
