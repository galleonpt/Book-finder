const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const path = require("path")

const routes = require("./routes");

dotenv.config();

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false)
mongoose.connect(
  process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => console.log("DB connected")
)

app.use(express.json());
app.use(routes);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.listen(3333);