const express = require("express");
const router = express.Router();

const BookController = require("./controllers/bookController");

router.get("/", BookController.index);
router.get("/", BookController.showAll);

router.post("/", BookController.create);

router.put("/", BookController.update);

router.delete("/", BookController.delete);

module.exports = router;