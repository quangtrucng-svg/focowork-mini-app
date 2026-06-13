const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const { authenticate, requireRole } = require('../middleware/auth');

router.use(authenticate);

router.get('/', async (req, res) => {
    try {
          const employees = await Employee.findAll();
          res.json(employees);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/me', async (req, res) => {
    try {
          const me = await Employee.findById(req.user.employee_id);
          res.json(me);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/:id', async (req, res) => {
    try {
          const emp = await Employee.findById(req.params.id);
          if (!emp) return res.status(404).json({ error: 'Not found' });
          res.json(emp);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/', requireRole('sep', 'pgd'), async (req, res) => {
    try {
          const id = await Employee.create(req.body);
          res.status(201).json({ id });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
