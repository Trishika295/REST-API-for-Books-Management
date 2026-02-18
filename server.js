const express = require("express");
const app = express();

app.use(express.json()); 
app.use(express.static(__dirname));
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Book API is running 🚀");
});

let books = [
    { id: 1, title: "Eloquent JavaScript", author:  "Marijn Haverbeke" },
    { id: 2, title: "Head First Java", author: "Kathy Sierra & Bert Bates"}
];

app.get("/books", (req, res) => {
    res.json(books);
});

app.get("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
});

app.post("/books", (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ message: "Title and Author required" });
    }
    const newBook = {
        id: books.length + 1,
        title,
        author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;
    const book = books.find(b => b.id === id);
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    book.title = title || book.title;
    book.author = author || book.author;
    res.json(book);
});

app.delete("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }
    books.splice(index, 1);
    res.json({ message: "Book deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
