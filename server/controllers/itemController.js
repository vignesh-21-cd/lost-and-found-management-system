const Item = require("../models/Item");

const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const addItem = async (req, res) => {
  try {
    const { name, usn, phone, location, description, status } = req.body;
    const image = req.file ? req.file.path : "";

    console.log("Received data:", {
      name,
      usn,
      phone,
      location,
      description,
      image,
      status,
    });

    if (
      !name ||
      !usn ||
      !phone ||
      !location ||
      !description ||
      !image ||
      !status
    ) {
      console.log("Validation failed: Missing fields");
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const newItem = new Item({
      name,
      usn,
      phone,
      location,
      description,
      image,
      status,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const searchItems = async (req, res) => {
  try {
    const { search } = req.query;
    const items = await Item.find({
      description: { $regex: search, $options: "i" },
    });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};




module.exports = { getItems, addItem, searchItems };
