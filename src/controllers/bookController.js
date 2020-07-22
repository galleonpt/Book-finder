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

      return response.json(books);
    } catch (e) {
      return response.send(e);
    }
  },

  //show only 1 book by giving his title
  async index(request, response) {
    try {
      const books = await Book.find(request.query);

      return response.json(books);
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
      response.status(400).send(e);
    }
  },

  //deleting a book giving his id
  async delete(request, response) {
    try {
      const book = await Book.findByIdAndDelete(request.query.id)

      return response.status(200).json(book);
    } catch (e) {
      response.status(400).send(e);
    }
  },
};