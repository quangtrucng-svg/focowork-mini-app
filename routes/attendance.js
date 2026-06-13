const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.post('/checkin', async (req, res) => {
    try {
          const { lat, lng, location } = req.body;
          const empId = req.user.employee_id;
          await pool.query(
                  'INSERT INTO attendance (id, employee_id, work_date, check_in_at, location, lat, lng, status) ' +
                  'VALUES (UUID(), ?, CURDATE(), NOW(), ?, ?, ?, \'in\') ' +
                  'ON DUPLICATE KEY UPDATE check_in_at = NOW(), lat = VALUES(lat), lng = VALUES(lng)',
                  [empId, location || null, lat || null, lng || null]
                );
          res.json({ ok: true, action: 'checkin' });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/checkout', async (req, res) => {
    try {
          const empId = req.user.employee_id;
          await pool.query(
                  'UPDATE attendance SET check_out_at = NOW(), status = \'out\' WHERE employee_id = ? AND work_date = CURDATE()',
                  [empId]
                );
          res.json({ ok: true, action: 'checkout' });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/me', async (req, res) => {
    try {
          const [rows] = await pool.query(
                  'SELECT * FROM attendance WHERE employee_id = ? ORDER BY work_date DESC LIMIT 30',
                  [req.user.employee_id]
                );
          res.json(rows);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
