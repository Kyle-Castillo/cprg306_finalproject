import axios from "axios";

const baseURL = 'https://openlibrary.org/search.json';

const fetchBooks = async (query) => {
    try {
        const response = await axios.get(baseURL, { params: {q : query} });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from OpenLibrary API:', error);
        return null;
    }
};

export default fetchBooks;