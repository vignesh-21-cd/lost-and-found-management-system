const express = require("express");
const multer = require("multer");
const auth = require("../middleware/authMiddleware");

const {
  getItems,
  addItem,
  searchItems,
} = require("../controllers/itemController");

const router = express.Router();

// Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes

// Public routes
router.get("/", getItems);
router.get("/search", searchItems);

// Protected route (LOGIN REQUIRED)
router.post("/", auth, upload.single("image"), addItem);

module.exports = router;
