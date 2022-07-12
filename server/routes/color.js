const express = require("express");
const router = express();
const Color = require("../models/color");

// *** GET ***

// Get all colors
router.get("/", async (req, res) => {
  try {
    const colors = await Color.find();
    res.status(200).json(colors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single color
router.get("/:id", getColor, (req, res) => {
  res.status(200).send(res.color);
});

// *** POST ***

router.post("/", async (req, res) => {
  // Validation ...
  if (!req.body.color)
    return res.status(400).json({ message: "Missing color" });

  // Create new color object
  const color = new Color(req.body);

  // Try to insert new color into database ...
  try {
    const newColor = await color.save();
    res.status(201).json({ color: newColor });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// *** UPDATE ***

// PATCH
router.patch("/:id", getColor, async (req, res) => {
  if (req.body.name) res.color.name = req.body.name;
  if (req.body.color) res.color.color = req.body.color;

  try {
    const updatedColor = await res.color.save();
    res.status(200).json({ service: updatedColor });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// *** DELETE ***

router.delete("/:id", getColor, async (req, res) => {
  try {
    let removedId = res.color._id;
    await res.color.remove();
    res.status(200).json({ message: "Color removed", id: removedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware
async function getColor(req, res, next) {
  let color;

  try {
    color = await Color.findById(req.params.id);
    if (color == null)
      return res.status(404).json({ message: "Color not found." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  res.color = color;
  next();
}

module.exports = router;
