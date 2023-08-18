const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database"); 

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/insert", (req, res) => {
  const { amount, discription } = req.body;
  db.execute("INSERT INTO list (amount, discription) VALUES (?, ?)", [
    amount,
    discription,
  ])
    .then(() => {
      res.send("Data is added");
    })
    .catch((error) => {
      console.error("Error inserting data:", error);
      res.status(500).send("An error occurred while adding data");
    });
});

app.get("/api/get", (req, res) => {
  db.execute("SELECT * FROM list")
    .then(([rows]) => {
      res.json(rows);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).send("An error occurred while fetching data");
    });
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  db.execute("DELETE FROM list WHERE id = ?", [id])
    .then(() => {
      res.send("Data is deleted");
    })
    .catch((error) => {
      console.error("Error deleting data:", error);
      res.status(500).send("An error occurred while deleting data");
    });
});

app.listen(3000, "localhost", () => {
  console.log("Server is running on port 3000");
});