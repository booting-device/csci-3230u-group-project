import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

var bookAPI = express.Router();


import data from './mockData.json' with { type: 'json' };
import reviewData from './reviewMockData.json' with { type: 'json' };

const reviewsByIsbn: Record<string, { rating: number; name: string; content: string }[]> = reviewData;

bookAPI.get('/recommended', (req, res) => {
    res.send(data.slice(0, 3))
});

bookAPI.get('/handpicked', (req, res) => {
    res.send(data.slice(3, 6))
});

bookAPI.get('/similar', (req, res) => {
    res.send(data.slice(2, 6))
});

bookAPI.get('/reviews/:isbn', (req, res) => {
    const book = data.find((book) => book.isbn === req.params.isbn);
    if (!book) {
        res.status(404).json({ error: 'Book not found' });
        return;
    }

    const reviews = reviewsByIsbn[req.params.isbn] ?? [];
    res.json(reviews.map(({ rating, name, content }) => ({
        rating,
        author: name,
        content,
    })));
});


bookAPI.get('/isbn/:id', (req, res) => {
    const book = data.find((book) => book.isbn === req.params.id);
    if (!book) {
        res.status(404).json({ error: 'Book not found' });
        return;
    }
    res.json(book);
});


const coverDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../covers');
console.log(coverDirectory)
bookAPI.use('/covers', express.static(coverDirectory));
// bookAPI.use(express.static("../cosvers"))

export { bookAPI };