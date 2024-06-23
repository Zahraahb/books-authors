import express from 'express'
import connectionDB from "./db/connectionDB.js"
import booksRouter from "./src/modules/books/book.routes.js"
import authorsRouter from "./src/modules/authors/author.routes.js"

const app = express()
const port = 3000

connectionDB()
app.use(express.json());

app.use("/books", booksRouter)
app.use("/authors",authorsRouter)

app.get("/", (req, res) => {
  res.json({ message: "Hello on my project!" });
});

app.use("*", (req, res) => res.status(404).json({ msg: "404 page not found" }));
app.listen(port, () => console.log(`server is running on port ${port}!`));

