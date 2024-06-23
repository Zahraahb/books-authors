import bookModel from "../../../db/models/book.model.js";

//get all books
export const getBooks = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  const books = await bookModel
    .find()
    .limit(parseInt(limit)) //number of books in each page
    .skip((parseInt(page) - 1) * parseInt(limit)); //returned books in opened page
  const numOfBooks = await bookModel.countDocuments();
  const totalPages = Math.ceil(numOfBooks / parseInt(limit));

  return res
    .status(200)
    .json({ msg: "done", totalPages, currntPage: parseInt(page), books });
};

//add book
export const addBook = async (req, res, next) => {
  const { title, content, author } = req.body;
  const book = await bookModel.create({ title, content, author });
  return res.status(200).json({ msg: "done", book });
};

//get book with id
export const getBook = async (req, res, next) => {
  const { id } = req.params;
  const book = await bookModel.findById(id);
  return res.status(200).json({ msg: "done", book });
};

//update book by id
export const updateBook = async (req, res, next) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  const book = await bookModel.findByIdAndUpdate(
    id,
    { title, content, author },
    { new: true }
  );
  if (!book) {
    return res.status(404).json({ msg: "book not found!" });
  }

  return res.status(200).json({ msg: "book updated successfully", book });
};

//delete book by id
export const deleteBook = async (req, res, next) => {
  const { id } = req.params;
  const book = await bookModel.findByIdAndDelete(id);
  if (!book) {
    return res.status(404).json({ msg: "book not found" });
  }
  return res.status(200).json({ msg: "book deleted successfully" });
};
