import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const Upload = () => {
  const UPLOAD_API = import.meta.env.VITE_UPLOAD_API;
  const navigate = useNavigate()
  const [subject, setSubject] = useState(1);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const [semester, setSemester] = useState(1);
  const subjects = {
    1: ["CST101", "ECT101", "MAT101", "AIT101", "HST101"],
    2: ["CST102", "ECT102", "AIT102", "MMT102", "HST102"],
    3: ["CST201", "ECT201", "ECT211", "CST211", "HST201", "MAT201"],
    4: ["CST102", "ECT102", "AIT102", "MMT102", "HST102"],
    5: ["CST102", "ECT102", "AIT102", "MMT102", "HST102"],
    6: ["CST102", "ECT102", "AIT102", "MMT102", "HST102"],
    7: ["CST102", "ECT102", "AIT102", "MMT102", "HST102"],
    8: ["CST102", "ECT102", "AIT102", "MMT102", "HST102"],
  };

  const totalSemester = Object.keys(subjects);
  // console.log(totalSemester);

  const availabeSubjects = subjects[Number(semester)];
  // console.log(availabeSubjects);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    const notesData = {
      subject: subject,
      description: description,
      semester: semester,
    }

    formData.append("Notes", JSON.stringify(notesData));

    try {
      axios
        .post(UPLOAD_API, formData, {
          withCredentials: true
        })
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("Error In Form Uploading");
      
    }
    console.log("Form Data: ", formData);
    navigate("/notes");
  };

  
  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[#101828]">
        <form
          action=""
          onSubmit={submitHandler}
          className="w-full max-w-lg p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-8 md:mt-9"
        >
          <div>
            <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
              semester
            </label>
            <select
              name="semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">---select semester---</option>
              {totalSemester.map((subjects, i) => (
                <option value={i + 1} key={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
              subject
            </label>
            <select
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">---select subject---</option>
              {availabeSubjects.map((subjects, i) => (
                <option value={subjects} key={i + 1}>
                  {subjects}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input
              type="file"
              className="block w-full text-sm text-gray-500 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-200 dark:hover:file:bg-gray-600"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Describe about this note"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <input
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer transition-colors"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Upload;
