import getNotes from "../api/notes.api.js";
import NotesCart from "../components/NotesCart.jsx";

import { useEffect, useState } from "react";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    getNotes()
      .then((res) => {
        // console.log(res);
        setNotes(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="min-h-screen md:p-11 relative max-md:right-3 pt-28 md:mt-16 md:pl-[70px] bg-[#101828] flex-col  max-md:items-center md:flex-row flex gap-6 md:flex-wrap ">
        {notes.map((item) => (
          <NotesCart item={item} key={item._id} />
        ))}
      </div>
    </>
  );
};

export default Notes;
