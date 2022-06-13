const express = require("express");
const app = express();
const mongoose = require("mongoose");
const BookModel = require("./models/BookModel");
const cors = require("cors");

app.use(express.json());
app.use(cors());
mongoose.connect(
  "mongodb+srv://server:123@cluster0.nujxi.mongodb.net/bookstore-app?retryWrites=true&w=majority"
);

app.get("/getBooks", (req, res) => {
  BookModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createBook", async (req, res) => {
  const book = req.body;
  const newBook = new BookModel(book);
  await newBook.save();

  res.json(book);
});

app.put("/updateBook", async (req, res) => {
  const newName = req.body.newName;
  const newPage = req.body.newPage;

  const id = req.body.id;
  try {
    await BookModel.findById(id, (error, updatedBook) => {
      updatedBook.name = newName;
      updatedBook.page = newPage;
      updatedBook.save();
    });
  } catch (error) {
    console.log(error);
  }
  res.json("updated");
});

//burada belrlenen sayı rasgele bır sayıdır.Local hosttaki port numarasını burada belırlıyoruz
app.listen(5000, () => {
  console.log("Server is Running....");
});
