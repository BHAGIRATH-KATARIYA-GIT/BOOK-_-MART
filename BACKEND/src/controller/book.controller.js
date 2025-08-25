import Book from "../models/book.models.js";

export const getBooks = async (req, res) => {
  try {
    const book = await Book.find();
    res.status(200).json(book);
  } catch (error) {
    console.log("GetBook Error");
    res.status(500).json({ message: error.message });
  }
};