import authorModel from "../../../db/models/author.model.js";
import bookModel from "../../../db/models/book.model.js";

//add author
export const addAuthor = async (req,res,next)=>{
    const {name, bio ,birthDate} = req.body
    if(!req.body.name){
        return res.status(400).json({msg:"name is required"})
    }
    const authorBooks = await bookModel.find({author:req.body.name})
    const booksId =[]
    authorBooks.forEach((book)=>{
        booksId.push({_id:book._id})
    })

    const author = await authorModel.create({name, bio, birthDate, books:booksId});
    return res.status(200).json({msg:"done",author})
}

//get all authors
export const getAuthors = async (req,res,next)=>{
    const { page = 1, limit = 10 } = req.query;

    const authors = await authorModel
      .find()
      .populate("books")
      .limit(parseInt(limit))//number of authors in each page
      .skip((parseInt(page) - 1) * parseInt(limit));//returned authors in opened page

      const numOfAuthors = await authorModel.countDocuments();
      const totalPages = Math.ceil(numOfAuthors / parseInt(limit));

    return res.status(200).json({msg:"done",
    totalPages,
    currntPage:parseInt(page),
    authors})
}

//get author by id
export const getAuthor = async (req,res,next)=>{
    const author = await authorModel.findById(req.params.id).populate("books")
    if(!author){
        return res.status(404).json({msg:"author not found"})
    }
    return res.status(200).json({msg:"done",author})
}

//update author by id
const updateAuthor = async (req,res,next)=>{
    const {bio, birthDate} = req.body
     const authorBooks = await bookModel.find({ author: req.body.name });
     const booksId = [];
     authorBooks.forEach((book) => {
       booksId.push({ _id: book._id });
     });
    const author = await authorModel.findByIdAndUpdate(
      req.params.id,
      { bio, birthDate, books: booksId },
      { new: true, runValidators: true }
    );
    if(!author){
        return res.status(404).json({msg:"author not found"})
    }
    return res.status(200).json({msg:"done",author})
}

//delete author
export const deleteAuthor = async (req,res,next)=>{
    const author = await authorModel.findByIdAndDelete(req.params.id)
    if(!author){
        return res.status(404).json({msg:"author not found"})
    }
    return res.status(200).json({msg:"author deleted successfully"})
}