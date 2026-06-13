const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.get('/', async (req, res) => {
    try {
          const [rows] = await pool.query('SELECT * FROM requests ORDER BY created_at DESC');
          res.json(rows);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/:id', async (req, res) => {
    try {
          const [rows] = await pool.query('SELECT * FROM requests WHERE id = ?', [req.params.id]);
          if (!rows[0]) return res.status(404).json({ error: 'Not found' });
          res.json(rows[0]);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/', async (req, res) => {
    try {
          const data = { ...req.body, requester_id: req.user.employee_id };
          const [r] = await pool.query('INSERT INTO requests SET ?', [data]);
          res.status(201).json({ id: r.insertId });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
