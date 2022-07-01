if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();

const Item = require("./models/item");

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

// *** GET ***

// Get all users
app.get("/users", (req, res) => {
  res.status(200).json({ users: users });
});

// Get single user
app.get("/users/:id", getItem, (req, res) => {
  res.status(200).send(res.user);
});

// *** POST ***

app.post("/users", async (req, res) => {
  // Validation ...
  if (!req.body.name || !req.body.email)
    return res.status(400).json({ message: "Missing user data" });

  // Create new user object
  const newUser = {
    id: users[users.length - 1]?.id + 1 || 1,
    name: req.body.name,
    email: req.body.email,
  };

  // Try to insert new user into database ...
  try {
    users = [...users, newUser];
  } catch (e) {
    return res.status(417).json({ error: e });
  }

  res.status(201).json({ message: "User successfully created", user: newUser });
});

// *** UPDATE ***

// PUT
app.put("/users/:id", getItem, async (req, res) => {
  res.user.name = req.body.name;
  res.user.email = req.body.email;

  res.status(201).json({ method: req.method, user: res.user });
});

// PATCH
app.patch("/users/:id", getItem, async (req, res) => {
  if (req.body.name) res.user.name = req.body.name;
  if (req.body.email) res.user.email = req.body.email;

  res.status(201).json({ method: req.method, user: res.user });
});

// *** DELETE ***

app.delete("/users/:id", getItem, async (req, res) => {
  try {
    users = users.filter((user) => {
      return user.id !== res.user.id;
    });
  } catch (e) {
    return res.status(417).json({ error: e });
  }

  res
    .status(303)
    .json({ message: "User successfully removed!", user: res.user });
});

app.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

// Middleware
async function getItem(req, res, next) {
  let item;

  try {
    item = await Item.findById(req.params.id);
    if (service == null)
      return res.status(404).json({ message: "Item not found." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  res.item = item;
  next();
}
