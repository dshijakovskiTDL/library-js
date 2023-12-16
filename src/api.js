import fetch from "node-fetch"

const booksAPI = 'https://dshijakovskitdl.github.io/library-js/books.json'

// ? Utility function to get the books - making the fetching code reusable
export const getBooks = async () => {
    try {
        const response = await fetch(booksAPI)
        const books = await response.json()

        return { books, error: null }
    } catch (err) {
        // ? Feel free to format the error message any way you want
        return { books: null, error: `Failed to fetch books! ${err.toString()}` }
    }
}
