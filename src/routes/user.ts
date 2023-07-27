import express from 'express';

const router = express.Router();

router.get('/user', async (req, res) => {
  res.status(200).json({ message: 'hello' });
});

export default router;
