import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  image: {
    type: "String",
  },
  name: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
