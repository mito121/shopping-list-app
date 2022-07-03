if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();

// Parse request body
app.use(express.json());

/* CORS Config */
app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} -> ${req.originalUrl}`);

  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, PUT, PATCH, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-mac"
  );
  res.header("Access-Control-Expose-Headers", "x-mac, x-host");

  next();
});

/* Connect to mongoDB from connection string */
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Successfully connected to database."));

/* ## Routes ## */

/* Items */
const itemRouter = require("./routes/item");
app.use("/items", itemRouter);

/* Colors */
const colorRouter = require("./routes/color.js");
app.use("/colors", colorRouter);

app.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
