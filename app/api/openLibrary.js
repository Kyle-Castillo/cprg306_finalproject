import axios from "axios";
import { query } from "express";

const baseURL = 'https://openlibrary.org/search.json';

const fetchBooks = async (query) => {
    try {
        const response = await axios.get(baseURL, { params: {q : query} });
        return response.data;
    } catch (error) {
        console.error('Error fetching sta from OpenLibrary API:', error);
        return null;
    }
};

export default fetchBooks;