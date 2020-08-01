const express = require("express");
const router = express.Router();

const BookController = require("./controllers/bookController");

const multer = require("multer");
const multerConfig = require("./config/multer")

const upload = multer(multerConfig)

router.get("/", BookController.index);
router.get("/all", BookController.showAll);

router.post("/", upload.single("cover"), BookController.create);

router.put("/", BookController.update);

router.delete("/", BookController.delete);

module.exports = router;