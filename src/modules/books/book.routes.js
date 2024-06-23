import {Router} from "express"
import * as BC from "./book.controller.js";

const router = Router()
router.get("/",BC.getBooks)
router.post("/addBook",BC.addBook)
router.get("/:id",BC.getBook)
router.patch("/update/:id",BC.updateBook)
router.delete("/delete/:id",BC.deleteBook)



export default router;