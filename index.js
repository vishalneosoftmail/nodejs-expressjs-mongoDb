const express = require("express");
const emprouter = require("./router");
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017";

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

try {
  con.on("open", () => {
    console.log("connected");
  });
} catch (error) {
  console.log("Error: " + error);
}

const app = express();

app.use(express.json());
app.use("/employee", emprouter);

app.listen(9000, () => {
  console.log("Server started");
});
