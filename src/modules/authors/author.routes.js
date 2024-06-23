import { Router } from "express";
import * as AC from "./author.controller.js";

const router = Router();

router.post("/addAuthor",AC.addAuthor)
router.get("/",AC.getAuthors)
router.get("/:id",AC.getAuthor)
router.patch("/update/:id",AC.addAuthor)
router.delete("/delete/:id", AC.deleteAuthor)




export default router;