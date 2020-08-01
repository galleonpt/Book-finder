const Book = require("../models/book");

module.exports = {
  //add a book
  async create(request, response) {
    try {

      const book = {
        ...request.body,
        cover: request.file.filename
      }

      const savedbook = await Book.create(book);

      return response.status(201).json(savedbook);
    } catch (e) {
      return response.status(500).send(e);
    }
  },

  //show all books
  async showAll(request, response) {
    try {
      const books = await Book.find()

      if (!books || books.length === 0)
        return response.json({
          message: "Books not found"
        }).status(400)

      const serializedBooks = books.map(book => {
        return {
          ...book.toObject(),
          cover: `http://192.168.1.7:3333/uploads/${book.cover}`
        }
      })

      return response.status(200).json(serializedBooks);
    } catch (e) {
      return response.send(e);
    }
  },

  //show a book by giving his characteristics
  async index(request, response) {
    try {
      const {
        title,
        author,
        price_min,
        price_max,
      } = request.query

      const book = await Book.find({
        title: new RegExp(title),
        author: new RegExp(author),
        price: {
          $gte: price_min,
          $lte: price_max
        }
      })

      if (!book || book.length === 0)
        return response.status(400).json({
          message: "Book not found",
        })

      const serializedBook = {
        ...book,
        cover: `http://192.168.1.7:3333/uploads/${book.cover}`
      }

      return response.json(serializedBook);
    } catch (e) {
      return response.send(e);
    }
  },

  //update data
  async update(request, response) {
    try {
      const books = await Book.findByIdAndUpdate(
        request.query.id,
        request.body, {
          new: true,
        }
      );

      return response.status(200).json(books);
    } catch (e) {
      response.status(400).json({
        message: "Book not found"
      });
    }
  },

  //deleting a book giving his id
  async delete(request, response) {
    try {
      const book = await Book.findByIdAndDelete(request.query.id)

      return response.status(200).json(book);
    } catch (e) {
      response.status(400).json({
        message: "Book not found"
      });
    }
  },
};