const Book = require("../models/book");
const {
  update
} = require("../models/book");
const book = require("../models/book");

module.exports = {
  //add a book
  async create(request, response) {
    try {
      const book = await Book.create(request.body);

      return response.status(201).json(book);
    } catch (e) {
      return response.status(500).send(e);
    }
  },

  //show all books
  async showAll(request, response) {
    try {
      const books = await Book.find()

      if (!books)
        return response.json({
          message: "Books not found"
        }).status(400)

      return response.status(200).json(books);
    } catch (e) {
      return response.send(e);
    }
  },

  //show a book by giving his characteristics
  async index(request, response) {
    try {
      const {
        title,
        description,
        author,
        price_min,
        price_max,
      } = request.query

      const book = await Book.find({
        title: new RegExp(title),
        description: new RegExp(description),
        author: new RegExp(author),
        price: {
          $gte: price_min,
          $lte: price_max
        }
      })

      if (!book || book.length === 0)
        return response.json({
          message: "Book not found",
        }).status(400)

      return response.json(book);
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