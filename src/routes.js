const express = require("express");
const router = express.Router();

const BookController = require("./controllers/bookController");

router.post("/", BookController.create);
router.get("/", BookController.show);
router.put("/books", BookController.update);

module.exports = router;