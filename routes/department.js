const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.get('/', async (req, res) => {
    try {
          const [rows] = await pool.query('SELECT * FROM departments ORDER BY name');
          res.json(rows);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/:id', async (req, res) => {
    try {
          const [rows] = await pool.query('SELECT * FROM departments WHERE id = ?', [req.params.id]);
          if (!rows[0]) return res.status(404).json({ error: 'Not found' });
          res.json(rows[0]);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
