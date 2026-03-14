import express from 'express';

const router = express.Router();

// dummy data and routes here
// example:
router.get('/', (req, res, next) => {
  try {
    res.json({ success: true, posts: [] });
  } catch (err) {
    next(err);
  }
});

export default router;
