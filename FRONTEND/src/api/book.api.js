import axios from "axios";
import { useState } from "react";

async function getBooksApi() {
const BOOK_API = import.meta.env.VITE_BOOK_API

  
  try {
    const response = await axios.get(BOOK_API);
    return response.data;
  } catch (error) {
    
    return error;
  }
}

export default getBooksApi;
