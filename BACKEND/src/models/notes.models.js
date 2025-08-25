import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  semester: {
    type: String,
  },
  subject: {
    type: String,
  },
  link: {
    type: String
  }
});

const Notes = mongoose.model("Notes", notesSchema);
export default Notes;
