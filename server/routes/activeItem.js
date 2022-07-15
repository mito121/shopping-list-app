const express = require("express");
const router = express();
const ActiveItem = require("../models/activeItem");
const Item = require("../models/item");

// *** GET ***

// Get all items
router.get("/", async (req, res) => {
  try {
    const items = await ActiveItem.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single item
router.get("/:id", getItem, (req, res) => {
  res.status(200).send(res.item);
});

// *** POST ***

router.post("/", async (req, res) => {
  // Validation ...
  if (!req.body.name || !req.body.color)
    return res.status(400).json({ message: "Missing item data" });

  // Create new item object
  const activeItem = new ActiveItem(req.body);

  /* Check if item exists in collection */
  /*
   *** @HERE
   *** @TODO: check if item exists in all-items
   */

  const query = await Item.findOne(req.body);
  let firstTimeItem = false;

  /* Item does not exist in all items, add new item */
  if (!query) {
    firstTimeItem = true;
    const item = new Item(req.body);
    await item.save();
    console.log("new item added to all items", item);
  }

  // Add active item
  try {
    const newItem = await activeItem.save();
    res.status(201).json({ item: newItem, firstTimeItem: firstTimeItem });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// *** UPDATE ***

// PATCH
router.patch("/:id", getItem, async (req, res) => {
  if (req.body.name) res.item.name = req.body.name;
  if (req.body.color) res.item.color = req.body.color;

  try {
    const updatedItem = await res.item.save();
    res.status(200).json({ service: updatedItem });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// *** DELETE ***

router.delete("/:id", getItem, async (req, res) => {
  try {
    let removedId = res.item._id;
    await res.item.remove();
    res.status(200).json({ message: "Item removed", id: removedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware
async function getItem(req, res, next) {
  let item;

  try {
    item = await ActiveItem.findById(req.params.id);
    if (item == null)
      return res.status(404).json({ message: "Item not found." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  res.item = item;
  next();
}

module.exports = router;
