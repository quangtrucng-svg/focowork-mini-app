const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.get('/', async (req, res) => {
    try {
          const tasks = await Task.findAll(req.query);
          res.json(tasks);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/:id', async (req, res) => {
    try {
          const task = await Task.findById(req.params.id);
          if (!task) return res.status(404).json({ error: 'Not found' });
          res.json(task);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/', async (req, res) => {
    try {
          const id = await Task.create(req.body);
          res.status(201).json({ id });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.patch('/:id/status', async (req, res) => {
    try {
          const task = await Task.updateStatus(req.params.id, req.body.status);
          res.json(task);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
