const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5056;
const DATABASE = process.env.DB_NAME;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(`mongodb://localhost:27017/${DATABASE}`);

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Medicine Schema
const medicineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  manufacturer: { type: String, required: true },
  composition: { type: String, required: true },
  category: { type: String, required: true },
  pack_size: { type: String, required: true },
});

const Medicine = mongoose.model("Medicine", medicineSchema);

app.get("/", async (req, res) => {
  res.send("Welcome to Healify API");
});

// Search API
app.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    const medicines = await Medicine.find({
      title: { $regex: `^${query}`, $options: "i" },
    }).limit(20);
    res.json(medicines);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
