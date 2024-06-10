const express = require('express');
const pool = require('./config'); // Ensure the correct path

const router = express.Router();

router.get('/test-db-connection', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({ success: true, time: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
