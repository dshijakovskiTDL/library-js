## Beyond the Basics of JavaScript
### Intermediate level JavaScript course

##### Daniel Shijakovski - Web Developer

### Library API
This app will be a small library API that will provide information on books through:
  - Searching & filtering by category
  - Fetching information on a single book

as well as functionality to add and/or remove books to/from the database.

---

### The database
We will mock a database by just having a simple `books.json` file present, where we will read and write data from/to.

---

### Search & filter books
To search books and filter them by a category, we can make a `GET request` to the `/search` endpoint.

##### Query parameters
We may pass a query parameter with the key and value of the category we want to search & filter by:

- `title: string` - Title of the book
- `author: string` - Author of the book
- `genre: string` - The book's genre
- `sales: number` - Total number of sales the book has done
- `publication_date: number` - Year when the book was published

Ex. If we want to search for fiction books, we can make a `GET request` to `/search?genre=Fiction`

##### Success
A list of all books (only title and author) is returned
```json
{
    "books": { "title": string, "author": string }[]
}
```

##### Error
If there are no books matching the query, return an error message
```json
{
    "error": "No books match the query!"
}
```

---

### Fetch a book
To fetch information about a single book, we can do that using the book's `id` property. We just make a `GET request` to the `/:id` endpoint.

##### Success
If the book is found, return information about it
```json
{
    "id": number,
    "title": string,
    "author": string,
    "genre": string,
    "sales": number,
    "publication_date": number
}
```

##### Error
If the book cannot be found, return an error message
```json
{
    "error": "We can't find a book matching the ID: {id}!"
}
```

---

### Add a new book
To add a new book to the database, we can make a `POST request` to the `/add` endpoint with the body:

```json
{
    "id": number,
    "title": string,
    "author": string,
    "genre": string,
    "sales": number,
    "publication_date": number
}
```

> **Note:** We will generate the ID using a library called `uuid`

##### Success
If the book is successfully added, return the book object
```json
{
    "id": number,
    "title": string,
    "author": string,
    "genre": string,
    "sales": number,
    "publication_date": number
}
```

##### Error
If there was any kind of error, return an error message
```json
{
    "error": "Failed to add book!"
}
```
