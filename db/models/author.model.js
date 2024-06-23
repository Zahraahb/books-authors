import { Schema, model } from "mongoose";

const authorSchema = new Schema({
   name:{
     type: String,
     required: true
     
   },
   bio:String,
   birthDate:Date,
   books:[{
     type: Schema.Types.ObjectId,
     ref: "book"
   }]

})

const authorModel = model("author",authorSchema)
export default authorModel;