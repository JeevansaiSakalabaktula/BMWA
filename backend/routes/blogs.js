const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const authMiddleware = require('../middleware/authMiddleware');

// 🔥 POST /api/blogs - Create a blog
router.post('/', authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const newBlog = new Blog({
      title,
      content,
      author: req.user.userId, // comes from token
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while creating blog' });
  }
});

module.exports = router;
