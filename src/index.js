// ? We need to convert the project type to 'module' inside `package.json`
// ? in order to be able to use `import` and `export` syntax
// ? "type": "module"
import express from 'express'
import bodyParser from 'body-parser'
import { getBooks } from './api.js'
import { z } from 'zod'
import { randomUUID } from 'crypto'

// ? Create a new server instance
const server = express()

// ? Middleware to correctly parse the JSON request bodies sent to our server
server.use(bodyParser.json())

const PORT = 3000 // The port our server will listen to

server.get('/', (req, res) => {
    res.json({ message: 'Hello and welcome to the TDL library!' })
})

// ? Listen for a GET request at '/search' - to search for books by some category
server.get('/search', async (req, res) => {
    const { query } = req

    // ? Get the books and handle any related errors early
    const { books, error } = await getBooks()

    if (error) {
        res.status(500).json({ error })
        return
    }

    // ? Get the keys of the query params from the `query` object
    const keys = Object.keys(query)

    // ? If no category is passed in, return all the books
    if (keys.length === 0) {
        res.status(200).json({ books })
        return
    }

    const key = keys[0]
    // ? We will only be filtering by 1 category, that's why we are only
    // ? getting the first key
    // ? BONUS: Add the ability to filter by multiple categories as an exercise

    const filteredBooks = books.filter((book) => {
        // ? Early error checking - see if the key (category) is a valid category
        if (!book[key]) return

        // ? Convert both values to a string in order to cover number-type values
        // ? The to-lower-case conversion is just there to make the search case-insensitive
        const categoryValue = book[key].toString().toLowerCase()
        const searchTerm = query[key].toString().toLowerCase()

        // ? We can filter using multiple approaches
        // ? startsWith - filter by the starting value of the `categoryValue` (we will use this one)
        // ? match - filter by a substring match
        // ? direct equal - filter only exact matches
        // ? Feel free to experiment with different filtering approaches

        return categoryValue.startsWith(searchTerm)
    })

    // ? When no books match the query, return an error message
    if (filteredBooks.length === 0) {
        res.status(404).json({ error: 'No books match the query!' })
        return
    }

    res.status(200).json({ books: filteredBooks })
})

// ? Listen for a GET request at '/:id' - to get a book identified by the `id` param
server.get('/:id', async (req, res) => {
    const { params } = req

    // ? Early error checking - ensure there is a valid id passed in
    if (!params.id) {
        res.status(400).json({ error: 'Please provide a valid book ID!' })
        return
    }

    // ? Get the books and handle any related errors early
    const { books, error } = await getBooks()

    if (error) {
        res.status(500).json({ error })
        return
    }

    // ? Use the HOF find() to find the book by the provided id
    // * find() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    const targetBook = books.find((book) => {
        return book.id === params.id
    })

    if (!targetBook) {
        res.status(404).json({ error: `We can't find a book matching the ID: ${id}` })
        return
    }

    res.json(200).json(targetBook)
})

// ? Listen for a POST request at '/add' - to add a new book in the library
server.post('/add', (req, res) => {
    const { body } = req

    // ? Check if the request body matches our required shape of a book
    // ? (no need to require an id - we will generate that ourselves)
    const BookSchema = z.object({
        title: z.string(),
        author: z.string(),
        genre: z.string(),
        sales: z.number(),
        publication_date: z.number()
    }).strict()

    const result = BookSchema.safeParse(body)

    // ? Early return error checking
    // ? Return an error message if the body is an invalid shape
    if (!result.success) {
        // ? Can check out 'zod' documentation on how it provides errors
        // * zod - https://zod.dev/
        res.status(400).json({ error: 'Invalid request body!' })
        return
    }

    // ? Now, `result.data` will be our book object with a valid shape

    // ? Generate an ID - can do this in multiple ways
    // ? (here we will use the built-in module `crypto`)
    const id = randomUUID()
    const book = { id, ...result.data }

    // ? At this point, you need to add this book to whatever database you will
    // ? potentially be using for your project
    // ? In our case, we won't be doing that, will will just return the book
    res.status(201).json(book)
})

// ? After setting up all the handlers, we need to tell the server to
// ? start listening to requests
server.listen(PORT, () => {
    console.log('THe TDL library is open for business!')
})
