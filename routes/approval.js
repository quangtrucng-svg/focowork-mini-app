const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.get('/request/:requestId', async (req, res) => {
    try {
          const [rows] = await pool.query(
                  'SELECT * FROM approvals WHERE request_id = ? ORDER BY step_order',
                  [req.params.requestId]
                );
          res.json(rows);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/:id/decision', async (req, res) => {
    try {
          const { status, note } = req.body;
          await pool.query(
                  'UPDATE approvals SET status = ?, note = ?, approver_id = ?, decided_at = NOW() WHERE id = ?',
                  [status, note || null, req.user.employee_id, req.params.id]
                );
          res.json({ ok: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
