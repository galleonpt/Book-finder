const Book = require("../models/book");
const {
  update
} = require("../models/book");
const book = require("../models/book");

module.exports = {

  //adicionar um livro
  async create(request, response) {
    try {
      const book = await Book.create(request.body);

      return response.status(201).json(book);
    } catch (e) {
      return response.status(500).send(e);
    }
  },

  //mostrar o livro com um nome especifico
  async show(request, response) {
    try {
      const title = request.query;

      const books = await Book.find(title);

      return response.json(books);
    } catch (e) {
      return response.send(e);
    }
  },

  async update(request, response) {
    try {

      //funciona

      const books = await Book.findByIdAndUpdate(request.query.id, request.body, {
        new: true,
      })

      return response.status(200).json(books)
      // const books = await Book.find(title)

      // const updatedBooks = books.map((item) => {
      //   return {

      //     ...item,
      //     description: "descricao alterada",
      //   }
      // })

      // return response.status(200).json(updatedBooks)
    } catch (e) {
      response.status(400).send(e)
    }
  }
};