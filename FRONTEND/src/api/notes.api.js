import axios from 'axios'



const getNotes = async () => {
    const NOTES_API = import.meta.env.VITE_NOTES_API
    try {
        const response = await axios.get(NOTES_API)
        return response.data;
        
    } catch (error) {
        return error
        
    }
}


export default getNotes;